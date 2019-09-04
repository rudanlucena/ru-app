import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-confronto-campeonato',
  templateUrl: './cadastro-confronto-campeonato.page.html',
  styleUrls: ['./cadastro-confronto-campeonato.page.scss'],
})
export class CadastroConfrontoCampeonatoPage implements OnInit {
  confronto:Confronto
  toast:any
  id:number

  constructor( private alertCtrl:AlertController,  public toastController: ToastController, private confrontoService:ConfrontoService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.confronto = new Confronto();
  }

  ngOnInit() {
    //this.id = Number(this.activatedRoute.snapshot.paramMap.get('idCampeonatoAtual'));
    let idLocalStorage = localStorage.getItem("idCampeonatoRoot");
  }

  ionViewWillEnter() {
    let idLocalStorage = localStorage.getItem("idCampeonatoAtual");
    if (idLocalStorage != null) {
      
      this.id = Number(idLocalStorage)
      
    }
    else{
      this.presentAlert();
      this.router.navigate(["/tabs/tab1/"])
    }


  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Você não está logado!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  

  async adicionarConfronto(){
    try{
      console.log("=====   confronto ======")
      console.log(this.confronto)
      await this.confrontoService.addConfrontoCampeonato(this.confronto, this.id)
      window.location.href="/tabs/tab2"
      //this.router.navigate(["/tabs/tab2"])
      console.log(this.confronto)
      this.showToastSuccess();
    }
    catch(e){
      this.showToastFail();
    }
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Jogo adicionado com sucesso',
      color: "success",
      position: "middle",
      duration: 3000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  showToastFail() {
    this.toast = this.toastController.create({
      message: 'Não foi possivel adicionar o jogo',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

}
