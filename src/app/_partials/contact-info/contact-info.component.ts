import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  @Input() contact: Contact;

  faFacebook = faFacebook;
  faEmail = faEnvelope;
  faPhone = faPhone;
  faLocation = faMapMarkerAlt;

  constructor() { }

  ngOnInit() {
  }
}
