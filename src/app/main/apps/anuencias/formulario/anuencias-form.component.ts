import { Subject, Observable } from 'rxjs';
import * as _moment from 'moment';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Anuencia } from '../anuencias.model';
import { CartoriosService } from 'app/main/third-party-services/cartorios.service';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { TitulosService } from 'app/main/third-party-services/titulos.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialogRef, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { DocumentsValidate } from 'core21/utils/documents-validate';

_moment.locale('pt-br');

@Component(
{
    selector     : 'anuencia21-anuencias-form',
    templateUrl  : './anuencias-form.component.html',
    styleUrls    : ['./anuencias-form.component.scss'],
    animations   : fuseAnimations

})
export class AnuenciasFormComponent implements OnInit
{
    @Input() form: FormGroup;
    anuencia: Anuencia;
    pageType: string;
    anuenciaForm: FormGroup;
    progressBar = false;

    habilitaBusca = false;

    minDate = new Date(1900, 0, 1);
    maxDate = new Date(Date.now());

    maskCpfCnpj: string;

    // Private
    private _unsubscribeAll: Subject<any>;
    
    cartorios: any;

    filteredOptions: Observable<any[]>;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    constructor( 
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _cartoriosService: CartoriosService,
        private _titulosService: TitulosService
    )
    {
        // Set the default
        this.anuencia = new Anuencia();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.anuenciaForm = this.formBuilder.group({});
       
        this._cartoriosService.get().then(response =>  
        {
            this.cartorios = response._embedded.cartorio;

            this.filteredOptions = this.form.get('cartorio').valueChanges
                                            .pipe(
                                                startWith<string | any>(''),
                                                map((value: any) => typeof value === 'string' ? value : value.nome),
                                                map(nome => nome ? this._filter(nome) : this.cartorios.slice())
                                            );
        });

    }

    ngOnInit(): void
    {
        this.form.addControl('id', new FormControl(this.anuencia.id));
        this.form.addControl('documentoDevedor', new FormControl(this.anuencia.documentoDevedor));
        this.form.addControl('numeroTitulo', new FormControl(this.anuencia.numeroTitulo));
        this.form.addControl('nomeDevedor', new FormControl({ value: this.anuencia.nomeDevedor, disabled: true }));
        this.form.addControl('numeroProtocolo', new FormControl({ value: this.anuencia.numeroProtocolo, disabled: true }));
        this.form.addControl('valorTitulo', new FormControl({ value: this.anuencia.valorTitulo, disabled: true }));
        this.form.addControl('dataVencimento', new FormControl({ value: this.anuencia.dataVencimento, disabled: true }));
        this.form.addControl('telefoneDevedor', new FormControl({ value: this.anuencia.telefoneDevedor, disabled: true }));
        this.form.addControl('emailDevedor', new FormControl({ value: this.anuencia.emailDevedor, disabled: true }));
        this.form.addControl('cartorio', new FormControl({ value: this.anuencia.cartorio }));
    
        this.form.statusChanges.subscribe(() => 
        {
            this.habilitaBusca = this.form.get('documentoDevedor').valid && 
                                 this.form.get('cartorio').valid && 
                                 this.form.get('numeroTitulo').valid; 
        });

        this.form.get('documentoDevedor')
                    .valueChanges
                    .subscribe(control => 
                    {
                        if (control.length > 11)
                        {
                            this.maskCpfCnpj = '00.000.000/0000-00';
                            this.form.get('documentoDevedor').setValidators(DocumentsValidate.cnpj);
                        }
                        else
                        {
                            this.maskCpfCnpj = '000.000.000-000';
                            this.form.get('documentoDevedor').setValidators(DocumentsValidate.cpf);
                        }
                    });
    }

    displayFn(cartorio?: any): string | undefined {
        return cartorio ? cartorio.nome : undefined;
      }

    private _filter(value: string): string[] 
    {
        const filterValue = value.toLowerCase();
        return this.cartorios.filter(cartorio => cartorio.nome.toLowerCase().indexOf(filterValue) === 0);
    }

    buscaTitulo(): void
    {
        this.progressBar = true;
        const dadosForm = this.form.getRawValue();
        this._titulosService.get( dadosForm.numeroTitulo, dadosForm.cartorio.id, dadosForm.documentoDevedor).then(titulo => 
        {
            if (titulo)
            {
                this.form.patchValue(
                {
                    valorTitulo: titulo.valor,
                    numeroProtocolo: titulo.protocolo,
                    dataVencimento: _moment(titulo.dataVencimento, 'dd/MM/yyyy').toDate(),
                    nomeDevedor: this.obterNomeDevedor(titulo.devedores, dadosForm.documentoDevedor)

                });

                this.form.get('emailDevedor').enable();
                this.form.get('telefoneDevedor').enable();
            }
            else
            {
                this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
                    disableClose: false
                });
                
                this.confirmDialogRef.componentInstance.confirmMessage = 'Não foi encontrado nenhum título com os dados informados.' + 
                ' Deseja continuar o cadastro?';

                this.confirmDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
                    if ( result )
                    {
                        this.habilitarCampos();
                    }
                    else
                    {
                        this.desabilitarCampos();
                    }   

                    this.confirmDialogRef = null;
                });
            }

            this.progressBar = false;
        });
    }

    obterNomeDevedor = (devedores: any[], documento: string): any =>
        devedores.find(devedor => devedor.documento === documento).nome

    habilitarCampos(): void
    {
        this.form.get('emailDevedor').enable();
        this.form.get('telefoneDevedor').enable();
        this.form.get('nomeDevedor').enable();
        this.form.get('numeroProtocolo').enable();
        this.form.get('valorTitulo').enable();
        this.form.get('dataVencimento').enable();
    }

    desabilitarCampos(): void
    {
        this.form.get('emailDevedor').disable();
        this.form.get('telefoneDevedor').disable();
        this.form.get('nomeDevedor').disable();
        this.form.get('numeroProtocolo').disable();
        this.form.get('valorTitulo').disable();
        this.form.get('dataVencimento').disable();
    }
}
