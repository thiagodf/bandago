import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Banda } from '../bandas.model';
import { BandasInMemoryService } from '../bandas-in-memory.service';

@Component(
{
    selector     : 'ensaiogo-bandas-cadastrar-editar',
    templateUrl  : './Bandas-cadastrar-editar.component.html',
    styleUrls    : ['./Bandas-cadastrar-editar.component.scss'],
    animations   : fuseAnimations

})
export class BandasCadastrarEditarComponent implements AfterViewInit, OnInit
{
   
    banda: Banda;
    pageType: string;
    bandaForm: FormGroup;
    acaoEditar = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private _bandasService: BandasInMemoryService,
        private _router: Router,
        private _route: ActivatedRoute
    )
    {

        this.bandaForm = this.formBuilder.group({});
        // Set the default
        this.banda = new Banda();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    novaBanda(): void
    {
        this._bandasService.add(this.bandaForm.getRawValue()).then(() => this._router.navigate([`/Bandas/novas`]));
    }

    editarBanda(): void
    {
        this._bandasService.update(this.banda).then( () => this._router.navigate([`/Bandas/novas`]));
    }
    
    ngOnInit(): void
    {
        if (this.banda.id)
        {
            this.acaoEditar = true;
        }
    }

    ngAfterViewInit(): void 
    {
        this._route.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => 
        {
            this._bandasService.getById(res.id).then(response => this.bandaForm.patchValue(response));
           
        });
    }
}
