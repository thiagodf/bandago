import * as _moment from 'moment';

import { fuseAnimations } from '@fuse/animations';

import { Component, Input, ViewEncapsulation } from '@angular/core';

_moment.locale('pt-br');

@Component(
{
    selector     : 'anuencia21-anuencias-situacoes',
    templateUrl  : './anuencias-situacoes.component.html',
    styleUrls    : ['./anuencias-situacoes.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AnuenciasSituacoesComponent
{
    @Input()
    situacao: string;
}
