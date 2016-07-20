import {Component} from '@angular/core';
import {Alert,NavController} from 'ionic-angular';
import {ScientificFactsPage} from '../scientific-facts-page/scientific-facts-page';

@Component({
  templateUrl: 'build/pages/work-page/work-page.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController) {
    this._navController = _navController;
  }

  goToFactsPage(){
    this._navController.push(ScientificFactsPage);
  }
  doAlert(){
    let alert = Alert.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    this._navController.present(alert);
  }
}
