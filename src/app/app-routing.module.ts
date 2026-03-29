import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // Named language routes
  { path: 'en',  component: HomeComponent },
  { path: 'fr',  component: HomeComponent },
  { path: 'es',  component: HomeComponent },
  { path: 'de',  component: HomeComponent },
  // Default — no language in URL
  { path: '',    component: HomeComponent, pathMatch: 'full' },
  // Catch-all
  { path: '**',  redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
