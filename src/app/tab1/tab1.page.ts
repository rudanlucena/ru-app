import { Component, ViewChild, ViewChildren } from '@angular/core';

import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AlunoService } from '../service/aluno-service';
import { Aluno } from '../model/Aluno';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title =  'app' ;
  elementType =  'url' ;
  value =  '' ;
  //@ViewChild('select1') select1: Select;
  @ViewChildren('select1') select: Selection;
  @ViewChildren('cepInput') cepInput;
  
  showSpinner:boolean = false

  public idCampeonato:string
  public cep:string
  public selectDisabled:boolean
  public toast:any
  public aluno:Aluno
  matricula:string
  senha:string
  public myAngularxQrCode: string = null;

  constructor(public loadingController: LoadingController, private alertCtrl:AlertController, private alunoService:AlunoService, private toastController:ToastController, private router:Router) {
  
    this.idCampeonato=""
    this.selectDisabled = true
    let cepLocalStorage = localStorage.getItem("cepAtual");
    this.aluno = new Aluno();
    this.aluno.matricula=""
    //this.myAngularxQrCode = '201512010340';
    
    //this.cep = cepLocalStorage
  }

  ionViewWillEnter(){
    this.aluno = JSON.parse(localStorage.getItem("aluno"));
    if(this.aluno!=null)
      this.value = this.aluno.matricula
      else{
        this.value = ""
      }
    console.log(this.aluno);
  }

  buscarAluno() {
    this.showSpinner = true;
    this.alunoService.getAlunoByLogin(this.matricula, this.senha).subscribe(
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
        console.log("Não foi possivel efetuar o login");
      }
    )
  }


  /*async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }*/

  showToastFail() {
    this.toast = this.toastController.create({
      message: 'Não foi possivel efetuar o login',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Não foi possivel efetuar o login',
      buttons: ['OK']
    });

    await alert.present();
  }

  selecionarCampeonato(id:string){
    localStorage.setItem("idCampeonatoAtual", id);
    this.router.navigate(["/tabs/tab2"])
    console.log("Carreagando....");
  }

  sair(){
    localStorage.removeItem("aluno");
    this.aluno = null;
    this.ionViewWillEnter()
  }

}
