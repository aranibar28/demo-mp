import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { IndexComponent } from './pages/index/index.component';
import { CardsComponent } from './pages/cards/cards.component';
import { PlanComponent } from './pages/plan/plan.component';
import { SuscriptionComponent } from './pages/suscription/suscription.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'suscripciones', component: SuscriptionComponent },
      { path: '**', redirectTo: 'index' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
