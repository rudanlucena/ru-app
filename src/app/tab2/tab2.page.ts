import { Component } from '@angular/core';
import { IonSlides, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Campeonato } from '../model/Campeonato';
import { Noticia } from '../model/Noticia';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';
import { CampeonatoService } from '../service/campeonato-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../service/noticia-service';
import { NoticiaCampeonatoService } from '../service/noticia-service-campeonato';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public campeonato: Campeonato
  public noticias: Noticia[]
  public confrontos: Confronto[]
  toast: any
  id: number
  idCampeonatoRoot
  public showleague:boolean;

  constructor(private noticiaCampeonatoService:NoticiaCampeonatoService, public loadingController: LoadingController, private alertCtrl: AlertController, public toastController: ToastController, private confrontoService: ConfrontoService, private campeoantoService: CampeonatoService, private noticiaService: NoticiaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.campeonato = new Campeonato()
    this.confrontos = []
    this.noticias = []
    this.showleague = false;

    
    console.log(this.idCampeonatoRoot)
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.idCampeonatoRoot = sessionStorage.getItem("idCampeonatoRoot");
    this.presentLoading();
    let idLocalStorage = localStorage.getItem("idCampeonatoAtual");
    if (idLocalStorage != null) {
      this.showleague = true;
      this.id = Number(idLocalStorage)
      this.buscarCampeonato(this.id)
      this.buscarNoticias(this.id)
      this.buscarConfrontos(this.id)
    }
    else{
      this.presentAlert();
      this.showleague = false;
      this.router.navigate(["/tabs/tab1/"])
    }


  }

  async campeonatosNotFound() {
    const alert = await this.alertCtrl.create({
      message: 'Nenhum Campeonato encontrado nesse CEP!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Você ainda não selecionou nunhum campeonato!.',
      buttons: ['OK']
    });

    await alert.present();
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


  buscarCampeonato(id: number) {
    this.campeoantoService.getCampeonato(id).subscribe(
      response => {
        this.campeonato = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
        this.campeonatosNotFound();
        this.router.navigate(["/tabs/tab1/"])
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
    if (!this.campeonato.pro && this.noticias.length >= 15) {
      this.showPopup('Atualize para uma versão PRO e tenha um limite de até 20 noticias! opcionalmente você pode remover noticias antigas e assim poderá adicionar as mais atuais', 'Conta PRO - Limite de 5 noticias antingidas');
      this.router.navigate(["/cadastro-pro/"])
    }
    else if (this.campeonato.pro && this.noticias.length >= 20) {
      this.showPopup('Você não pode cadastrar novas noticias! ', 'Limite de 20 noticias antingidas');
    }
    else {
      this.router.navigate(["/cadastro-noticia-campeonato/" + this.id])
    }
  }

  async adicionarConfronto() {
    if (this.confrontos.length >= 10) {
      this.showPopup('Remova partidas antigas e assim poderá adicionar novas', 'Conta PRO - 10 jogos cadastrados');
    }
    else {
      this.router.navigate(["/cadastro-confronto/" + this.id])
    }
  }



  async removerNoticia(idNoticia: number) {
    try {
      await this.noticiaCampeonatoService.removeNoticia(idNoticia, this.id)
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

  sair(){
    localStorage.removeItem("idCampeonatoRoot");
    this.router.navigate(["/tabs/tab4/"])
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Você realmente deseja excluir sua equipe do app?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Excluir',
          handler: () => {
            console.log('Confirm Okay');
            this.removerCampeonato();
          }
        }
      ]
    });

    await alert.present();
  }

  async removerCampeonato() {
    try {
      localStorage.removeItem("idCampeonatoRoot");
      await this.campeoantoService.removerCampeonato(this.id)
      this.showToastSuccess();
      this.router.navigate(["/tabs/tab4/"])
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
