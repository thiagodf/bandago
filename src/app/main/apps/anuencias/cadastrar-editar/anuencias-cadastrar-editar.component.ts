import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Anuencia } from '../anuencias.model';
import { AnuenciasInMemoryService } from '../anuencias-in-memory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component(
{
    selector     : 'anuencia21-anuencias-cadastrar-editar',
    templateUrl  : './anuencias-cadastrar-editar.component.html',
    styleUrls    : ['./anuencias-cadastrar-editar.component.scss'],
    animations   : fuseAnimations

})
export class AnuenciasCadastrarEditarComponent implements AfterViewInit, OnInit
{
   
    anuencia: Anuencia;
    pageType: string;
    anuenciaForm: FormGroup;
    acaoEditar = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private _anuenciasService: AnuenciasInMemoryService,
        private _router: Router,
        private _route: ActivatedRoute
    )
    {

        this.anuenciaForm = this.formBuilder.group({});
        // Set the default
        this.anuencia = new Anuencia();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    novaAnuencia(): void
    {
        this._anuenciasService.add(this.anuenciaForm.getRawValue()).then(() => this._router.navigate([`/anuencias/novas`]));
    }

    editarAnuencia(): void
    {
        this._anuenciasService.update(this.anuencia).then( () => this._router.navigate([`/anuencias/novas`]));
    }
    
    ngOnInit(): void
    {
        if (this.anuencia.id)
        {
            this.acaoEditar = true;
        }
    }

    ngAfterViewInit(): void 
    {
        this._route.params.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => 
        {
            this._anuenciasService.getById(res.id).then(response => this.anuenciaForm.patchValue(response));
           
        });
    }
}
