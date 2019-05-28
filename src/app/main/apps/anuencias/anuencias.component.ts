import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { FormGroup } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { Anuencia } from './anuencias.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';

@Component(
{
    selector     : 'anuencia21-anuencias',
    templateUrl  : './anuencias.component.html',
    styleUrls    : ['./anuencias.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AnuenciasComponent
{
    anuencia: Anuencia;
    pageType: string;
    anuenciaForm: FormGroup;

    situacao: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _route: ActivatedRoute
    )
    {
        // Set the default
        this.anuencia = new Anuencia();

        this._route.params.subscribe(res => this.situacao = res.situacao);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
}
