import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTestComponent } from './form-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FilterModule } from 'src/app/shared/pipes/filter/filter.module';

const routes: Routes = [
  {
    path: '',
    component: FormTestComponent,
  },
];

@NgModule({
  declarations: [FormTestComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), FilterModule],
})
export class FormTestModule {}
