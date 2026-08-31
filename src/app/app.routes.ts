import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { GestionPage } from './gestion/gestion.page';
import { ConfiguracionesPage } from './configuraciones/configuraciones.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'gestion', component: GestionPage },
  { path: 'configuraciones', component: ConfiguracionesPage },
];
