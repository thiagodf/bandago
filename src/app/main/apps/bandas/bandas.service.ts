import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BandasService implements Resolve<any>
{
    routeParams: any;
    banda: any;
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
     * Get banda
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
                this._httpClient.get('api/bandas/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.banda = response;
                        this.onProductChanged.next(this.banda);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Salvar banda
     *
     * @param banda
     * @returns {Promise<any>}
     */
    saveProduct(banda): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/bandas/' + banda.id, banda)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add banda
     *
     * @param banda
     * @returns {Promise<any>}
     */
    addProduct(banda): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/bandas/', banda)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
