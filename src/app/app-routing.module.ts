import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-test',
    pathMatch: 'full',
  },
  {
    path: 'form-test',
    loadChildren: () => import('./pages/form-test/form-test.module').then(m => m.FormTestModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
