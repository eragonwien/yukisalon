import { Component, OnInit, Input } from '@angular/core';
import { Contact } from "../../../models/Contact";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() contact: Contact;
  // faFacebook = faFacebook;
  // faEmail = faEnvelope;
  // faPhone = faPhone;
  // faLocation = faMapMarkerAlt;

  constructor() { }

  ngOnInit() {
    
  }
}
