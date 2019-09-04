import { Component, ViewChild, ViewChildren } from '@angular/core';
import { CampeonatoService } from '../service/campeonato-service';
import { Campeonato } from '../model/Campeonato';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  //@ViewChild('select1') select1: Select;
  @ViewChildren('select1') select: Selection;
  @ViewChildren('cepInput') cepInput;
  
  showSpinner:boolean = false
  public campeonatos:Campeonato[]
  public idCampeonato:string
  public cep:string
  public selectDisabled:boolean
  public toast:any

  constructor(public loadingController: LoadingController, private alertCtrl:AlertController, private campeonatoService:CampeonatoService, private toastController:ToastController, private router:Router) {
    this.campeonatos = []
    this.idCampeonato=""
    this.selectDisabled = true
    let cepLocalStorage = localStorage.getItem("cepAtual");
    //this.cep = cepLocalStorage
  }

  ionViewWillEnter(){
    console.log("ionViewDidLoad");
    setTimeout(() => {
      this.cepInput.setFocus();
    }, 500);
  }

  buscarCampeonatos() {
    this.showSpinner = true;
    localStorage.setItem("cepAtual", this.cep);
    this.campeonatoService.getCampeonatos(this.cep).subscribe(
      response => {
        this.showSpinner = false
        this.campeonatos = response.body
      
        if(this.campeonatos.length!=0){
          this.selectDisabled = false;
        }
        if(this.campeonatos.length==0){
          this.presentAlert()
          this.selectDisabled = true;
        }
      },
      error => {
        this.showSpinner = false
        console.log("Houve algum erro ao carregar a lista");
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
      message: 'Nenhum campeonato encontrado para este CEP',
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
      message: 'Nenhum campeonato encontrado para este CEP. Você ainda pode ver a lista de clubes deste CEP clicando no icone de times',
      buttons: ['OK']
    });

    await alert.present();
  }

  selecionarCampeonato(id:string){
    localStorage.setItem("idCampeonatoAtual", id);
    this.router.navigate(["/tabs/tab2"])
    console.log("Carreagando....");
  }

}
