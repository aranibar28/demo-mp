import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { CardsComponent } from './pages/cards/cards.component';
import { SuscriptionComponent } from './pages/suscription/suscription.component';
import { PreapprovalComponent } from './pages/preapproval/preapproval.component';
import { PreapprovalPlanComponent } from './pages/preapproval-plan/preapproval-plan.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'preapproval', component: PreapprovalComponent },
      { path: 'preapproval_plan', component: PreapprovalPlanComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'planes', component: SuscriptionComponent },
      { path: '**', redirectTo: 'preapproval' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
