import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component(
{
    selector     : 'anuencia21-components',
    templateUrl  : './components.component.html',
    styleUrls    : ['./components.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EnsaioGoComponentsComponent implements OnInit
{

    constructor() 
    { 
    }

    ngOnInit(): void
    {

    }
}
