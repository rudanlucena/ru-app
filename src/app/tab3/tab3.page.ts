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
  showSpinner:boolean = false
  clubes:Clube[];
  clubesSearch:Clube[];

  constructor(private alertController:AlertController, public loadingController: LoadingController, private clubeService:ClubeService) {
    
  }

  ionViewWillEnter() {
    let cepAtual = localStorage.getItem("cepAtual");
    this.buscarClubes(cepAtual)

  }

  buscarClubes(cep:string){
    this.showSpinner = true;
    this.clubeService.getClubes(cep).subscribe(
      response => {
        this.showSpinner = false;
        this.clubes = response.body
        if(this.clubes.length==0){
          this.presentAlert();
        }
        else{
          this.showSpinner = false;
          this.clubesSearch = this.clubes;
        }
        console.log(response)
        
      },
      error => {
        this.presentAlertError();
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

  async presentAlertError() {
    const alert = await this.alertController.create({
      message: 'Não foi possivel carregar a lista de clubes no momento.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getUsuarios(ev: any) : void {
    let nome_pesquisa = ev.target.value;

    if (nome_pesquisa && nome_pesquisa.trim() != '') {
      this.clubesSearch = this.clubes.filter((clube) => {
        return (clube.nome.toLowerCase().indexOf(nome_pesquisa.toLowerCase()) > -1);
      })
    }
  }

}
