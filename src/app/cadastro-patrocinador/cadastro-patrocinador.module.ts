import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroPatrocinadorPage } from './cadastro-patrocinador.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPatrocinadorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroPatrocinadorPage]
})
export class CadastroPatrocinadorPageModule {}
