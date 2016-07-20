import {Component} from '@angular/core'
import {HomePage} from '../work-page/work-page';
import {AboutPage} from '../about-page/about-page';
import {ContactPage} from '../learn-page/learn-page';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
  }
}
