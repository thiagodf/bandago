import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorIntl,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressBar,
    MatProgressBarModule,
    MatMenuModule
} from '@angular/material';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseWidgetModule } from '@fuse/components';
import { Core21SharedModule } from 'core21/core21-shared.module';
import { getPtBrPaginatorTranslate } from 'core21/services/mat-translate/mat-paginator-translate';

import {NgxMaskModule} from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { ThirdPartyServicesModule } from 'app/main/third-party-services/third-party-services.module';
import { BandasComponent } from './bandas.component';
import { BandasService } from './bandas.service';
import { BandasInMemoryService } from './bandas-in-memory.service';
import { BandasCadastrarEditarComponent } from './cadastrar-editar/bandas-cadastrar-editar.component';

const routes: Routes = [
    {
        path     : '',
        component: BandasComponent,
    },
    {
        path     : 'cadastrar',
        component: BandasCadastrarEditarComponent
    },
    {
        path     : 'editar/:id',
        component: BandasCadastrarEditarComponent
    },
];

@NgModule({
    declarations   : [
        BandasComponent,
        BandasCadastrarEditarComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),
        CdkTableModule,

        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatDialogModule,
        MatTableModule,
        MatRippleModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatProgressBarModule,

        Core21SharedModule,

        FuseSharedModule,
        FuseConfirmDialogModule,

        MatChipsModule,
        MatExpansionModule,
        MatTabsModule,
        MatMenuModule,

        
        FuseWidgetModule,

        NgxMaskModule.forRoot(),
        NgxCurrencyModule,

        ThirdPartyServicesModule
        
    ],
    exports : [
        BandasComponent,
        BandasCadastrarEditarComponent,
    ],
    providers      : [
        BandasService,
        BandasInMemoryService,
        { provide: MatPaginatorIntl, useValue: getPtBrPaginatorTranslate() }
    ]
})
export class BandasModule
{
}
