import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroConfrontoCampeonatoPage } from './cadastro-confronto-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroConfrontoCampeonatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroConfrontoCampeonatoPage]
})
export class CadastroConfrontoCampeonatoPageModule {}
