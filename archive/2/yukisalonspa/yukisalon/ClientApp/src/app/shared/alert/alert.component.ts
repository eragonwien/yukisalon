import { Component, OnInit, Input } from '@angular/core';
import { AlertMessage } from '../../models/AlertMessage';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alerts: AlertMessage[];

  constructor() { }

  ngOnInit() {
  }

  close(alert: AlertMessage) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
