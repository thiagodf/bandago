import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AnuenciasService implements Resolve<any>
{
    routeParams: any;
    anuencia: any;
    onProductChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get anuencia
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get('api/anuencias/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.anuencia = response;
                        this.onProductChanged.next(this.anuencia);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Salvar anuencia
     *
     * @param anuencia
     * @returns {Promise<any>}
     */
    saveProduct(anuencia): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/anuencias/' + anuencia.id, anuencia)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add anuencia
     *
     * @param anuencia
     * @returns {Promise<any>}
     */
    addProduct(anuencia): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/anuencias/', anuencia)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
