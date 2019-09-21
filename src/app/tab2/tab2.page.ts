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
import { EnqueteConfronto } from '../model/EnqueteConfronto';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public campeonato: Campeonato
  public noticias: Noticia[]
  public confrontos: Confronto[]
  public enquetes: EnqueteConfronto[]
  toast: any
  id: number
  idCampeonatoRoot
  public showleague: boolean;

  showNoticias = true
  showJogos = false

  carregandoNoticias: Boolean = true

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  constructor(private uid: Uid, private androidPermissions: AndroidPermissions,private noticiaCampeonatoService: NoticiaCampeonatoService, public loadingController: LoadingController, private alertCtrl: AlertController, public toastController: ToastController, private confrontoService: ConfrontoService, private campeoantoService: CampeonatoService, private noticiaService: NoticiaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.campeonato = new Campeonato()
    this.confrontos = []
    this.noticias = []
    this.enquetes = []
    this.showleague = false;


    console.log(this.idCampeonatoRoot)
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log("JHGJGJGHJGJ")
    //this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.idCampeonatoRoot = sessionStorage.getItem("idCampeonatoRoot");

    //this.presentLoading();
    let idLocalStorage = localStorage.getItem("idCampeonatoAtual");
    if (idLocalStorage != null) {
      this.showleague = true;
      this.id = Number(idLocalStorage)
      this.buscarConfrontos(this.id)
      this.buscarCampeonato(this.id)
      this.buscarNoticias(this.id)
      this.buscarEnquetes()

    }
    else {
      this.presentAlert();
      this.showleague = false;
      this.router.navigate(["/tabs/tab1/"])
    }

    console.log("IMEI: "+this.getImei())


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

  /*async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }*/


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
        this.carregandoNoticias = false;
        this.noticias = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }
  buscarEnquetes() {
    this.confrontoService.getEnquetes().subscribe(
      response => {
        this.enquetes = response.body
        this.enquetes.sort((a, b) => {
          // 1st property, sort by count
          if (a.id < b.id)
            return -1;

          if (a.id > b.id)
            return 1;

        });
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista de enquetes");
      }
    )
  }



  buscarConfrontos(id: number) {
    this.campeoantoService.getConfrontos(id).subscribe(
      response => {
        this.confrontos = response.body

        this.confrontos.sort((a, b) => {
          // 1st property, sort by count
          if (a.data < b.data)
            return -1;

          if (a.data > b.data)
            return 1;

        });

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
      this.router.navigate(["/cadastro-confronto-campeonato/" + this.id])
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
      await this.confrontoService.removeConfrontoCampeonato(idConfronto, this.id)
      this.showToastSuccess();
      this.buscarConfrontos(this.id)
    } catch (e) {
      this.showToastFail();
    }

  }

  sair() {
    sessionStorage.removeItem("idCampeonatoRoot");
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

  mostrarNoticias() {
    this.showJogos = false
    this.showNoticias = true
  }

  mostrarJogos() {
    this.showJogos = true
    this.showNoticias = false
  }

  carregarNoticia(noticia: Noticia) {
    sessionStorage.setItem("noticia", JSON.stringify(noticia))
    this.router.navigate(["/noticia"])
  }

  substringNoticia(texto: string): string {
    return texto.substring(0, 500)
  }

   async votar(id:number, palpite:string) {
    try {
      
      await this.confrontoService.votar(id, palpite)
      this.buscarEnquetes();
      this.showToastSuccess();
      
    } catch (e) {
      this.showToastFail();
    }

    console.log(id, palpite);
  }

  cortar(percentual:number):number{
    
    if(percentual!=0)
      return Number(percentual.toFixed(0))
      else
      return percentual
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
   
     return this.uid.IMEI
   }
}
