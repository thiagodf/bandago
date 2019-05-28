import { Banda } from './bandas.model';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup } from '@angular/forms';

@Component(
    {
        selector     : 'ensaiogo-bandas',
        templateUrl  : './bandas.component.html',
        styleUrls    : ['./bandas.component.scss'],
        animations   : fuseAnimations,
        encapsulation: ViewEncapsulation.None
    })
    export class BandasComponent
    {
        banda: Banda;
        pageType: string;
        bandaForm: FormGroup;
    
        situacao: string;
    
        // Private
        private _unsubscribeAll: Subject<any>;
    
        constructor(
            private _route: ActivatedRoute
        )
        {
            // Set the default
            this.banda = new Banda();
    
            this._route.params.subscribe(res => this.situacao = res.situacao);
    
            // Set the private defaults
            this._unsubscribeAll = new Subject();
        }
    }
    