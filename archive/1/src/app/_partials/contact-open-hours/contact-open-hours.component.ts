import { Component, OnInit, Input } from '@angular/core';
import { OpenHour } from '../../../models/open.hour';

@Component({
  selector: 'app-contact-open-hours',
  templateUrl: './contact-open-hours.component.html',
  styleUrls: ['./contact-open-hours.component.css']
})
export class ContactOpenHoursComponent implements OnInit {
  @Input() openHours: OpenHour[];


  constructor() { }

  ngOnInit() {

  }

}
