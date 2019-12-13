import { Component } from '@angular/core';
import { Aluno } from '../model/Aluno';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  alunoLogado:boolean=false;
  aluno:Aluno
  constructor() {}

  ionViewWillEnter() {
    
  }

}
