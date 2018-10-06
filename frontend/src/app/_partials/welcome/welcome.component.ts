import { Component, OnInit, Input } from '@angular/core';
import { MainService } from "../../main.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  @Input() title: String;
  @Input() text: String;
  @Input() extraText: String;


  constructor(private service: MainService) { }

  ngOnInit() {
  }
}


