import { Component, OnInit } from '@angular/core';
import { Noticia } from '../model/Noticia';
import { ToastController } from '@ionic/angular';
import { NoticiaCampeonatoService } from '../service/noticia-service-campeonato';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-noticia-campeonato',
  templateUrl: './cadastro-noticia-campeonato.page.html',
  styleUrls: ['./cadastro-noticia-campeonato.page.scss'],
})
export class CadastroNoticiaCampeonatoPage implements OnInit {
  public noticia:Noticia
  toast:any
  id:number
  isFoto = false
  foto:string
  constructor( public toastController: ToastController, private noticiaCampeonatoService:NoticiaCampeonatoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.noticia=new Noticia();
   }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async adicionarNoticia(){
    try{
      await this.noticiaCampeonatoService.addNoticia(this.noticia, this.id)
      window.location.href="/tabs/tab2"
      //this.router.navigate(["/tabs/tab2"])
      console.log(this.noticia)
      this.showToastSuccess();
    }
    catch(e){
      this.showToastFail();
    }
  }

  showToastSuccess() {
    this.toast = this.toastController.create({
      message: 'Noticia adicionada com sucesso',
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
      message: 'Não foi possivel adicionar a noticia',
      color: "danger",
      position: "middle",
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  onFileChanged(event) {
    this.isFoto = true;
    let me = this;
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.foto = reader.result.toString();
      me.noticia.img = me.foto;
      
    };
    
  }
}
