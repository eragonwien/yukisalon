import { Component } from '@angular/core';
import { Salon } from '../models/salon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yukifriseur';
  salon: Salon;

  constructor() {
  }
}
