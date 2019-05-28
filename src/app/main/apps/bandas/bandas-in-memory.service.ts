import { ServicesInMemoryService } from 'core21/services/services-in-memory.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { Musico } from '../musicos/musicos.model';

@Injectable()
export class BandasInMemoryService extends ServicesInMemoryService
{

    constructor(public snackBar: MatSnackBar)
    {
        super();

        const bandas = [];
        for (let index = 1; index <= 20; index++) 
        {
            bandas.push(
            {  
                'id': FuseUtils.generateGUID(),
                'nome': 'RockBand',
                'descricao': 'Banda de Rock alternativo',
            });
        }

        super.init(bandas);
    }

    add(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            obj.situacao = 1;
            obj.data = Date.now();
            
            super.add(obj).then((response) =>
            {
                this.snackBar.open('Banda cadastrada com sucesso.', null, { duration: 3000 });
                resolve(response);
            });
        });
    }

    update(obj: any): Promise<any>
    {
        return new Promise((resolve) =>
        {
            super.update(this.objs.find(ob => ob.id === obj.id).indexOf(), obj).then((response) => 
            {
                this.snackBar.open('Banda editada com sucesso.', null, { duration: 3000 });
                resolve(response);
            });
        });
    }

    delete(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.objs.splice(this.objs.indexOf(obj), 1);
            this.onObjsChanged.next(this.objs);

            resolve(this.objs);
        });
    }
}
