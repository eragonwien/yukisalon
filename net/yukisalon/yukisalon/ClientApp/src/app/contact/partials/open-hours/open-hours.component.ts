import { Component, OnInit, Input } from '@angular/core';
import { OpenHour, Contact } from "../../../models/Contact";

@Component({
  selector: 'app-open-hours',
  templateUrl: './open-hours.component.html',
  styleUrls: ['./open-hours.component.css']
})
export class OpenHoursComponent implements OnInit {

  @Input() openHours: OpenHour[];

  constructor() { }

  ngOnInit() {
  }

}
