import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { AnuenciasInMemoryService } from '../anuencias-in-memory.service';

@Component(
{
    selector     : 'anuencias-listas',
    templateUrl  : './anuencias-listas.component.html',
    styleUrls    : ['./anuencias-listas.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AnuenciasListasComponent implements OnInit, OnDestroy
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['numero', 'situacao', 'data', 'credor', 'nomeDevedor', 'documentoDevedor', 'titulo'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    // @ViewChild('filter')
    // filter: ElementRef;

    @ViewChild(MatSort)
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        protected _anuenciasService: AnuenciasInMemoryService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._anuenciasService, this.paginator, this.sort);

        // fromEvent(this.filter.nativeElement, 'keyup')
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(() => {
        //         if ( !this.dataSource )
        //         {
        //             return;
        //         }
        //         this.dataSource.filter = this.filter.nativeElement.value;
        //     });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(
        private _anuenciasService: AnuenciasInMemoryService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._anuenciasService.objs;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._anuenciasService.onObjsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._anuenciasService.objs.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'numero':
                    [propertyA, propertyB] = [a.numero, b.numero];
                    break;
                case 'situacao':
                    [propertyA, propertyB] = [a.situacao, b.situacao];
                    break;
                case 'data':
                    [propertyA, propertyB] = [a.data, b.data];
                    break;
                case 'credor':
                    [propertyA, propertyB] = [a.credor, b.credor];
                    break;
                case 'nomeDevedor':
                    [propertyA, propertyB] = [a.nomeDevedor, b.nomeDevedor];
                    break;
                case 'documentoDevedor':
                    [propertyA, propertyB] = [a.documentoDevedor, b.documentoDevedor];
                    break;
                case 'titulo':
                    [propertyA, propertyB] = [a.titulo, b.titulo];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect(): void
    {
    }
}
