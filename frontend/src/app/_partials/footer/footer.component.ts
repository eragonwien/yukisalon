import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() name: string;
  @Input() address: Address;
  addressStr: string;

  constructor() { }

  ngOnInit() {
    if (this.address) {
      this.addressStr = this.address.street + ", " + this.address.plz + " " + this.address.city;
    }
  }

}
