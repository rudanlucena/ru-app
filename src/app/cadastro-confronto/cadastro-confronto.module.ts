import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroConfrontoPage } from './cadastro-confronto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroConfrontoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroConfrontoPage]
})
export class CadastroConfrontoPageModule {}
