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

  constructor() {
    
  }

  ionViewWillEnter() {

  }

}
