import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { IServices } from '../services/services-in-memory.interface.service';

@Injectable()
export class ServicesInMemoryService implements IServices
{
    onObjsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    objs = [];

    constructor(
    )
    {
    }

    init(objs: any): any
    {
        this.objs = objs;

        this.get();
    }

    get(): Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.onObjsChanged.next(this.objs);
            resolve(this.objs);
        });
    }

    getById(id: string): Promise<any>
    {
        return new Promise((resolve) => resolve(this.objs.find(obj => obj.id === id)));
    }

    add(obj: any): Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.objs.push(obj);
            this.onObjsChanged.next(this.objs);
            resolve(this.objs);
        });
    }

    update(index: any, obj: any): Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.objs[index] = obj;
            this.onObjsChanged.next(this.objs);
            resolve(this.objs);
        });
    }

    delete(index: number, obj: any): Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.objs.splice(index, 1);
            this.onObjsChanged.next(this.objs);

            resolve(this.objs);
        });
    }
}
