import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { Salon, EditSalonInfoModel } from '../models/Salon';
import { Contact } from '../models/Contact';

@Injectable()
export class SalonService {

  private currentId: number;

  constructor(private http: HttpClient, private router: Router) { }

  get BaseUrl() { return window.location.origin; }
  get imagePath() { return this.BaseUrl + "/assets/images/"; }
  get ImagePathPrefix() { return "assets/images/"; }
  get Salon() { return this.getSalonById(0) }
  get SalonList() { return this.http.get(this.BaseUrl + "/api/Salon") }
  get currentSalonId() {
    if (!this.currentId) {
      this.currentId = Number(localStorage.getItem('currentSalonId'));
    } 
    return this.currentId;
  }

  set currentSalonId(id: number) {
    if (id) {
      this.currentId = id;
      localStorage.setItem('currentSalonId', id.toString());
    }
  }

  getSalonById(id: number) {
    return this.http.get(this.BaseUrl + "/api/Salon/" + id);
  }

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.handle401Error();
    }
  }

  handle401Error() {
    this.router.navigate(['maintenance/login'], { queryParams: { returnUrl: this.router.url }});
  }

  editSalonInfo(salon: Salon) {
    let url = this.BaseUrl + "/api/Salon/" + salon.id;
    let model = new EditSalonInfoModel(salon);
    return this.http.put(url, model, { observe: 'response' });
  }

  editSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact/" + contact.id;
    return this.http.put(url, contact, { observe: 'response' });
  }

  createSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact";
    return this.http.post(url, contact, { observe: 'response' });
  }

  removeSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact/" + contact.id;
    return this.http.delete(url, { observe: 'response' });
  }

  returnToMaintenanceIndex(){
    return this.router.navigate(['maintenance']);
  }

  scrollToViewById(divId: string) {
    let targetDiv = document.getElementById(divId);
    if (targetDiv) {
      document.getElementById(divId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
