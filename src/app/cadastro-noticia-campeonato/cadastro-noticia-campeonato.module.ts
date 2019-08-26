import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroNoticiaCampeonatoPage } from './cadastro-noticia-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroNoticiaCampeonatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroNoticiaCampeonatoPage]
})
export class CadastroNoticiaCampeonatoPageModule {}
