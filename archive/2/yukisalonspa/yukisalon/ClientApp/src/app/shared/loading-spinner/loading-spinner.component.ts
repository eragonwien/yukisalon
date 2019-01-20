import { Component, OnInit, Input } from '@angular/core';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  loadingIcon = faSpinner;

  constructor() { }

  ngOnInit() {
  }

}
