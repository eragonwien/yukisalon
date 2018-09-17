import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {
  }
}
