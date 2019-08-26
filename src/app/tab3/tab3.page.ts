import { Component } from '@angular/core';
import { ClubeService } from '../service/clube-service';
import { Clube } from '../model/Clube';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  clubes:Clube[];

  constructor(private alertController:AlertController, public loadingController: LoadingController, private clubeService:ClubeService) {
    
  }

  ionViewWillEnter() {
    this.presentLoading();
    let cepAtual = localStorage.getItem("cepAtual");
    this.buscarClubes(cepAtual)
  }


  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


  buscarClubes(cep:string){
    this.clubeService.getClubes(cep).subscribe(
      response => {
        this.clubes = response.body
        if(this.clubes.length==0){
          this.presentAlert();
        }
        console.log(response)
        
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Nenhum clube encontrado nesse CEP.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
