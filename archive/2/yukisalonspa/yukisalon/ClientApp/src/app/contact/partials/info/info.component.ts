import { Component, OnInit, Input } from '@angular/core';
import { Contact } from "../../../models/Contact";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() contact: Contact;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  facebookIcon = faFacebook;
  locationIcon = faMapMarkerAlt;

  constructor() { }

  ngOnInit() {
    
  }
}
