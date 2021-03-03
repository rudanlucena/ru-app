import { Component, OnInit } from '@angular/core';
import { ClubeService } from '../service/clube-service';
import { Clube } from '../model/Clube';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlunoService } from '../service/aluno-service';
import { Notificacao } from '../model/Notificacao';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public toast:any
  public showSpinner = false
  public notificacoes:Notificacao[]

  constructor(private toastController:ToastController, private clubeService:ClubeService, private alunoService:AlunoService, private router: Router) { 
    this.notificacoes = []
  }

  ngOnInit() {
    this.getNotificatios()
  }

  updateNotificatios(){
    this.getNotificatios()
  }

  getNotificatios(){
    this.alunoService.getNotificacoes(2032).subscribe(response => {
      this.notificacoes = response.body
      console.log(this.notificacoes.length)
    })
  }

}
