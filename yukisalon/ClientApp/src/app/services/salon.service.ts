import { Category } from "./../models/Product";
import { User } from "./../models/User";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Salon, EditSalonInfoModel } from "../models/Salon";
import { Contact } from "../models/Contact";

@Injectable()
export class SalonService {
  private currentId: number;

  alertDefaultTimeout: number = 20 * 1000;
  alertDismissible: boolean = true;
  alertDefaultSuccessHeader: string = "Erfolgreich";
  alertDefaultErrorHeader: string = "Fehler";

  activeText: string = "Aktiviert";
  cancelText: string = "Abbrechen";
  closeText: string = "Schließen";
  createCategoryText: string = "Neue Kategorie anlegen";
  createUserText: string = "Benutzer anlegen";
  displayedText: string = "Anzeigen";
  editCategoryText: string = "Kategorie bearbeiten";
  editUserText: string = "Benutzer bearbeiten";
  inactiveText: string = "Deaktiviert";
  openingHourOpenText: string = "Open";
  openingHourClosedText: string = "Closed";
  removeText: string = "Löschen";
  removeCategoryText: string = "Kategorie löschen";
  removeUserText: string = "Benutzer löschen";
  saveText: string = "Speichern";

  constructor(private http: HttpClient, private router: Router) {}

  /////////// GENERAL ///////////////////
  get BaseUrl() {
    return window.location.origin;
  }

  get imagePath() {
    return this.BaseUrl + "/assets/images/";
  }

  get ImagePathPrefix() {
    return "assets/images/";
  }

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.handle401Error();
    }
  }

  handle401Error() {
    this.router.navigate(["maintenance/login"], {
      queryParams: { returnUrl: this.router.url }
    });
  }

  /**
   * navigates to index page of maintenance page
   */
  returnToMaintenanceIndex() {
    return this.router.navigate(["maintenance"]);
  }

  /**
   * scroll to div
   * @param divId Id of the div
   */
  scrollToViewById(divId: string) {
    let targetDiv = document.getElementById(divId);
    if (targetDiv) {
      document
        .getElementById(divId)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /////////// SALON ///////////////////

  get Salon() {
    return this.getSalonById(0);
  }

  get SalonList() {
    return this.http.get(this.BaseUrl + "/api/Salon");
  }

  get currentSalonId() {
    if (!this.currentId) {
      this.currentId = Number(localStorage.getItem("currentSalonId"));
    }
    return this.currentId;
  }

  set currentSalonId(id: number) {
    if (id) {
      this.currentId = id;
      localStorage.setItem("currentSalonId", id.toString());
    }
  }

  /**
   * find a salon by id
   * @param id id of the salon
   */
  getSalonById(id: number) {
    return this.http.get(this.BaseUrl + "/api/Salon/" + id);
  }

  /**
   * send http put to update a salon by id
   * @param salon the edited salon
   */
  editSalonInfo(salon: Salon) {
    let url = this.BaseUrl + "/api/Salon/" + salon.id;
    let model = new EditSalonInfoModel(salon);
    return this.http.put(url, model, { observe: "response" });
  }

  /////////// CATEGORY ///////////////////

  createSalonCategory(category: Category) {
    let url = this.BaseUrl + "/api/Category";
    return this.http.post(url, category, { observe: "response" });
  }

  /**
   * send http put to update a category by id
   * @param category the edited category
   */
  editSalonCategory(category: Category) {
    let url = this.BaseUrl + "/api/Category/" + category.id;
    return this.http.put(url, category, { observe: "response" });
  }

  removeSalonCategory(category: Category) {
    let url = this.BaseUrl + "/api/Category/" + category.id;
    return this.http.delete(url, { observe: "response" });
  }
  /////////// CONTACT ///////////////////

  /**
   * send http post to add new contact to the db
   * @param contact the added contact
   */
  createSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact";
    return this.http.post(url, contact, { observe: "response" });
  }

  /**
   * send http put to update an existing contact by id
   * @param contact contact to be edited
   */
  editSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact/" + contact.id;
    return this.http.put(url, contact, { observe: "response" });
  }

  /**
   * remove a contact
   * @param contact contact to be removed
   */
  removeSalonContact(contact: Contact) {
    let url = this.BaseUrl + "/api/Contact/" + contact.id;
    return this.http.delete(url, { observe: "response" });
  }

  /////////// USER ///////////////////

  /**
   * send http post to create new user
   * @param user new user to be created
   */
  createSalonUser(user: User) {
    let url = this.BaseUrl + "/api/User/";
    return this.http.post(url, user, { observe: "response" });
  }

  /**
   * send http put to update existing user
   * @param user user to be edited
   */
  editSalonUser(user: User) {
    let url = this.BaseUrl + "/api/User/" + user.id;
    return this.http.put(url, user, { observe: "response" });
  }

  /**
   * send http delete to remove an user by id
   * @param user user to be removed
   */
  removeSalonUser(user: User) {
    let url = this.BaseUrl + "/api/User/" + user.id;
    return this.http.delete(url, { observe: "response" });
  }
}
