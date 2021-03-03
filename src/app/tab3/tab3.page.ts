import { Component } from '@angular/core';
import { ClubeService } from '../service/clube-service';
import { Clube } from '../model/Clube';
import { LoadingController, AlertController } from '@ionic/angular';
import { Cancelamento } from '../model/cancelamento';
import { AlunoService } from '../service/aluno-service';
import { Aluno } from '../model/Aluno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cancelamento:Cancelamento 
  almocoChecked:boolean = false
  jantarChecked:boolean = false
  aluno:Aluno

  constructor(private alunoService:AlunoService,
     private alertCtrl:AlertController,
     private router:Router) {
    this.cancelamento = new Cancelamento();
    this.aluno = new Aluno();
  }



  ionViewWillEnter() {
    this.aluno = JSON.parse(localStorage.getItem("aluno"));
    if(this.aluno==null){
      this.logar();
      this.router.navigate(["/tabs/tab1"])
    }
  }

  efetuarCancelamento() {
    if(this.almocoChecked)
      this.cancelamento.almoco = true
    if(this.jantarChecked)
      this.cancelamento.jantar = true

      console.log(this.cancelamento)

    if(this.cancelamento.motivo=="" || this.cancelamento.inicio=="" || this.cancelamento.fim==""){
      
      //this.presentAlert();
      return
    } 

    //verificar se ambos não foram marcados  
    this.cancelamento.aluno = this.aluno
    
    try {
      this.cancelamento.inicio = this.cancelamento.inicio.split('T')[0];
      this.cancelamento.fim = this.cancelamento.fim.split('T')[0];
      this.alunoService.cancelarRefeicao(this.cancelamento);
      //this.limparCampos();
      //this.aguardarSolicitacao();
      this.aguardarSolicitacao();
    } catch (error) {
      console.log("Não foi possivel solicitar o auxilio");
    }
    /*.subscribe(
      response => {
        this.showSpinner = false
        this.aluno = response.body
        console.log(this.aluno);
      
        if(this.aluno==null){
          this.presentAlert()
          this.selectDisabled = true;
        }

        localStorage.setItem("aluno", JSON.stringify(this.aluno))
        this.ionViewWillEnter()
      },
      error => {
        this.showSpinner = false
        
      }
    )*/
  }

  async logar() {
    const alert = await this.alertCtrl.create({
      message: 'Para solicitar uma refeição é necessario estar logado!',
      buttons: ['OK']
    });

    await alert.present();
  }

  async aguardarSolicitacao() {
    const alert = await this.alertCtrl.create({
      message: 'Solicitação Enviada. Para saber o status da sua solicitação entre na aba NOTIFICAÇÕES',
      buttons: ['OK']
    });

    await alert.present();
  }


}
