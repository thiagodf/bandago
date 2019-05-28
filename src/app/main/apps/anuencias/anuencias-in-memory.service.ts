import { ServicesInMemoryService } from 'core21/services/services-in-memory.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

@Injectable()
export class AnuenciasInMemoryService extends ServicesInMemoryService
{

    constructor(public snackBar: MatSnackBar)
    {
        super();

        const anuencias = [];
        for (let index = 1; index <= 20; index++) 
        {
            anuencias.push(
            {  
                'id': FuseUtils.generateGUID(),
                'situacao': Math.floor(Math.random() * 6) + 1,
                'data': Date.now(),
                'credor': 'Teste ' + index,
                'nomeDevedor': 'ABDRE INCORPORA ' + index,
                'documentoDevedor': '10355909000116',
                'numeroTitulo': '45201 ' + index
            });
        }

        super.init(anuencias);
    }

    add(obj: any): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            obj.situacao = 1;
            obj.data = Date.now();
            
            super.add(obj).then((response) =>
            {
                this.snackBar.open('Anuência cadastrada com sucesso.', null, { duration: 3000 });
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
                this.snackBar.open('Anuência editada com sucesso.', null, { duration: 3000 });
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
