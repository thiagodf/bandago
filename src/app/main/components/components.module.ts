import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Core21SharedModule } from 'core21/core21-shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTabsModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { AnuenciasModule } from '../apps/anuencias/anuencias.module';
import { EnsaioGoComponentsComponent } from './components.component';
import { BandasModule } from '../apps/bandas/bandas.module';

const routes: Routes = [
    {
        path     : '',
        component: EnsaioGoComponentsComponent,
    }
];

@NgModule({
    declarations   : [
        EnsaioGoComponentsComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        FuseSharedModule,

        Core21SharedModule,

        MatTabsModule,
        MatExpansionModule,
        MatIconModule,

        AnuenciasModule,
        BandasModule

    ],
    providers: []
})
export class EnsaioGoComponentsModule
{
}
