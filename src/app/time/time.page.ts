import { Component, OnInit } from '@angular/core';
import { Clube } from '../model/Clube';
import { ClubeService } from '../service/clube-service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Titulo } from '../model/Titulo';
import { TituloService } from '../service/titulo-service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Noticia } from '../model/Noticia';
import { NoticiaService } from '../service/noticia-service';
import { Patrocinador } from '../model/Patrocinador';
import { PatrocinadorService } from '../service/patrocinador-service';
import { Confronto } from '../model/Confronto';
import { ConfrontoService } from '../service/confronto-service';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {
  public clube: Clube
  public titulos: Titulo[]
  public noticias: Noticia[]
  public patrocinadores: Patrocinador[]
  public confrontos: Confronto[]
  toast: any
  id: number
  idRoot
  constructor( private alertCtrl: AlertController, public toastController: ToastController, private confrontoService: ConfrontoService, private patrocinadorService: PatrocinadorService, private tituloService: TituloService, private clubeService: ClubeService, private noticiaService: NoticiaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.clube = new Clube()
    this.titulos = []
    this.noticias = []
    this.patrocinadores = []

    
    console.log(this.idRoot)
  }


  ngOnInit() {

  }

  ionViewWillEnter() {
    this.idRoot = sessionStorage.getItem("idRoot");
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.buscarClube(this.id)
    this.buscarTitulos(this.id)
    this.buscarNoticias(this.id)
    this.buscarPatrocinadores(this.id)
    this.buscarConfrontos(this.id)
  }

  buscarClube(id: number) {
    this.clubeService.getClube(id).subscribe(
      response => {
        this.clube = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  buscarTitulos(id: number) {
    this.clubeService.getTitulos(id).subscribe(
      response => {
        this.titulos = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  buscarNoticias(id: number) {
    this.clubeService.getNoticias(id).subscribe(
      response => {
        this.noticias = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  buscarPatrocinadores(id: number) {
    this.clubeService.getPatrocinadores(id).subscribe(
      response => {
        this.patrocinadores = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }

  buscarConfrontos(id: number) {
    this.clubeService.getConfrontos(id).subscribe(
      response => {
        this.confrontos = response.body
        console.log(response)
      },
      error => {
        console.log("Houve algum erro ao carregar a lista");
      }
    )
  }



  async adicionarTitulo() {
    if(!this.clube.pro && this.titulos.length >= 5){
      this.showPopup('Atualize para uma versão PRO e cadastre até 30 titulos! ', 'Conta PRO - Limite de 5 titulos antingidos');
      this.router.navigate(["/cadastro-pro/"])
    }
    else if(this.clube.pro && this.titulos.length >= 30){
      this.showPopup('Você não pode cadastrar novos titulos! ', 'Limite de 30 titulos antingidos');
    }
    else{
      this.router.navigate(["/cadastro-titulo/" + this.id])
    }
  }

  async adicionarNoticia() {
    if(!this.clube.pro && this.noticias.length >= 5){
      this.showPopup('Atualize para uma versão PRO e tenha um limite de até 20 noticias! opcionalmente você pode remover noticias antigas e assim poderá adicionar as mais atuais', 'Conta PRO - Limite de 5 noticias antingidas');
      this.router.navigate(["/cadastro-pro/"])
    }
    else if(this.clube.pro && this.noticias.length >= 20){
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

  async adicionarPatrocinador() {
    if(!this.clube.pro && this.patrocinadores.length >= 2){
      this.showPopup('Atualize para uma versão PRO e cadastre até 15 patrocinadores!', 'Conta PRO');
      this.router.navigate(["/cadastro-pro/"])
    }
    else if(this.clube.pro && this.patrocinadores.length >= 15){
      this.showPopup('Você não pode cadastrar novos patrocinadores! ', 'Limite de 15 patrocinadores antingidos');
    }
    else{
      this.router.navigate(["/cadastro-patrocinador/" + this.id])
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

  async removerTitulo(idTitulo: number) {
    try {
      await this.tituloService.removeTitulo(idTitulo, this.id)
      this.showToastSuccess();
      this.buscarTitulos(this.id)
    } catch (e) {
      this.showToastFail();
    }

  }

  async removerPatrocinador(idTitulo: number) {
    try {
      await this.patrocinadorService.removePatrocinador(idTitulo, this.id)
      this.showToastSuccess();
      this.buscarPatrocinadores(this.id)
    } catch (e) {
      this.showToastFail();
    }

  }

  async removerClube() {
    try {
      await this.clubeService.removerClube(this.id)
      this.showToastSuccess();
      this.router.navigate(["/tabs/tab4/"])
    } catch (e) {
      this.showToastFail();
    }

  }

  sair(){
    sessionStorage.removeItem("idRoot");
    this.router.navigate(["/tabs/tab4/"])
  } 

  editar(){
    this.router.navigate(["/editar-clube/"+this.id])
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
            this.removerClube();
          }
        }
      ]
    });

    await alert.present();
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
