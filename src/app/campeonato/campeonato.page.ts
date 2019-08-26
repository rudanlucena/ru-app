import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Campeonato } from '../model/Campeonato';
import { Noticia } from '../model/Noticia';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';
import { CampeonatoService } from '../service/campeonato-service';
import { NoticiaService } from '../service/noticia-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.page.html',
  styleUrls: ['./campeonato.page.scss'],
})
export class CampeonatoPage implements OnInit {
  public campeonato: Campeonato
  public noticias: Noticia[]
  public confrontos: Confronto[]
  toast: any
  id: number
  idRoot
  constructor(private alertCtrl: AlertController, public toastController: ToastController, private confrontoService: ConfrontoService, private campeoantoService: CampeonatoService, private noticiaService: NoticiaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.campeonato = new Campeonato()
    this.confrontos = []
    this.noticias = []
 

    this.idRoot = sessionStorage.getItem("idRoot");
    console.log(this.idRoot)
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.buscarCampeonato(this.id)
    this.buscarNoticias(this.id)
    this.buscarConfrontos(this.id)
  }


  buscarCampeonato(id: number) {
    this.campeoantoService.getCampeonato(id).subscribe(
      response => {
        this.campeonato = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  

  buscarNoticias(id: number) {
    this.campeoantoService.getNoticias(id).subscribe(
      response => {
        this.noticias = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  

  buscarConfrontos(id: number) {
    this.campeoantoService.getConfrontos(id).subscribe(
      response => {
        this.confrontos = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }



  

  async adicionarNoticia() {
    if(!this.campeonato.pro && this.noticias.length >= 5){
      this.showPopup('Atualize para uma versão PRO e tenha um limite de até 20 noticias! opcionalmente você pode remover noticias antigas e assim poderá adicionar as mais atuais', 'Conta PRO - Limite de 5 noticias antingidas');
      this.router.navigate(["/cadastro-pro/"])
    }
    else if(this.campeonato.pro && this.noticias.length >= 20){
      this.showPopup('Você não pode cadastrar novas noticias! ', 'Limite de 20 noticias antingidas');
    }
    else{
      this.router.navigate(["/cadastro-noticia/" + this.id])
    }
  }

  async adicionarConfronto() {
    if(this.confrontos.length >= 10){
      this.showPopup('Remova partidas antigas e assim poderá adicionar novas', 'Conta PRO - 10 jogos cadastrados');
    }    
    else{
      this.router.navigate(["/cadastro-confronto/" + this.id])
    }
  }

  

  async removerNoticia(idNoticia: number) {
    try {
      await this.noticiaService.removeNoticia(idNoticia, this.id)
      this.showToastSuccess();
      this.buscarNoticias(this.id)
    } catch (e) {
      this.showToastFail();
    }

  }

  async removerConfronto(idConfronto: number) {
    try {
      await this.confrontoService.removeConfronto(idConfronto, this.id)
      this.showToastSuccess();
      this.buscarConfrontos(this.id)
    } catch (e) {
      this.showToastFail();
    }

  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Operação Realizada com sucesso',
      color: "success",
      position: "middle",
      duration: 3000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  showToastFail() {
    this.toast = this.toastController.create({
      message: 'Não foi possivel realizar a operação',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  async showPopup(title, text) {
    const alert = await this.alertCtrl.create({
      message: title,
      subHeader: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
}
