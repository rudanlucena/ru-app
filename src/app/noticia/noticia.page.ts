import { Component, OnInit } from '@angular/core';
import { NoticiaCampeonatoService } from '../service/noticia-service-campeonato';
import { IonSlides } from '@ionic/angular';
import { Noticia } from '../model/Noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  public noticia: Noticia
  id: number
  idCampeonatoRoot

  carregandoNoticias: Boolean = true

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  constructor(private noticiaCampeonatoService: NoticiaCampeonatoService,) { 
    this.noticia = new Noticia()
    this.noticia = JSON.parse( sessionStorage.getItem("noticia"))
  }

  ngOnInit() {
    //let noticia = sessionStorage.getItem("noticia");
    
  }

}
