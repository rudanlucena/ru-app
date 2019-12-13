import { Component } from '@angular/core';
import { IonSlides, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Noticia } from '../model/Noticia';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../service/noticia-service';
import { NoticiaCampeonatoService } from '../service/noticia-service-campeonato';
import { EnqueteConfronto } from '../model/EnqueteConfronto';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlunoService } from '../service/aluno-service';
import { AuxilioTemporario } from '../model/AuxilioTemporario';
import { Aluno } from '../model/Aluno';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public auxilio:AuxilioTemporario
  public aluno:Aluno;
  public almocoChecked:boolean = false
  public jantarChecked:boolean = false

  constructor(public loadingController: LoadingController,
              private alertCtrl:AlertController,
              private alunoService:AlunoService,
              private toastController:ToastController, 
              private router:Router) {

                this.auxilio = new AuxilioTemporario();
                this.auxilio.motivo = ""
                this.auxilio.inicio = ""
                this.auxilio.fim = ""
                this.aluno = new Aluno();
  
  }


  ngOnInit() {
    
  }

  limparCampos(){
    this.auxilio = new AuxilioTemporario();
                this.auxilio.motivo = ""
                this.auxilio.inicio = ""
                this.auxilio.fim = ""
                this.aluno = new Aluno();
    this.almocoChecked = false
    this.jantarChecked = false

  }

  ionViewWillEnter() {
    this.aluno = JSON.parse(localStorage.getItem("aluno"));
    if(this.aluno==null){
      this.logar();
      this.router.navigate(["/tabs/tab1"])
    }
  }



  solicitarAuxilioTemporario() {
    if(this.almocoChecked)
      this.auxilio.almoco = true
    if(this.jantarChecked)
      this.auxilio.jantar = true

      console.log(this.auxilio.motivo)

    if(this.auxilio.motivo=="" || this.auxilio.inicio=="" || this.auxilio.fim==""){
      
      this.presentAlert();
      return
    } 

    //verificar se ambos não foram marcados  
    this.auxilio.aluno = this.aluno
    
    try {
      this.alunoService.solicitarAuxilioTemporario(this.auxilio);
      this.limparCampos();
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
  
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Informe todos os campos obrigatorio',
      buttons: ['OK']
    });

    await alert.present();
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
