import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import {
  NgbAlertModule,
  NgbAccordionModule,
  NgbModalModule,
  NgbButtonsModule,
  NgbTimepickerModule,
  NgbDropdownModule
} from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { BannerComponent } from "./shared/banner/banner.component";
import { OpenHoursComponent } from "./contact/partials/open-hours/open-hours.component";
import { InfoComponent } from "./contact/partials/info/info.component";
import { ProductComponent } from "./product/product.component";
import { CategoryComponent } from "./product/partials/category/category.component";
import { PriceListComponent } from "./product/partials/price-list/price-list.component";
import { FeaturesComponent } from "./product/partials/features/features.component";
import { ProductCardComponent } from "./product/partials/product-card/product-card.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { MaintenanceIndexComponent } from "./maintenance/index/index.component";
import { SharedModule } from "./shared.module";
import { LogoutComponent } from "./logout/logout.component";
import { MaintenanceMenuComponent } from "./maintenance/maintenance-menu/maintenance-menu.component";
import { EditSalonProductComponent } from "./maintenance/edit-salon-product/edit-salon-product.component";
import { EditSalonUserComponent } from "./maintenance/edit-salon-user/edit-salon-user.component";
import { MaintenanceBaseFormComponent } from "./shared/maintenance-base-form/maintenance-base-form.component";
import { EditSalonInfoComponent } from "./maintenance/edit-salon-info/edit-salon-info.component";
import { EditSalonInfoGeneralComponent } from "./maintenance/edit-salon-info/edit-salon-info-general/edit-salon-info-general.component";
import { EditSalonInfoContactComponent } from "./maintenance/edit-salon-info/edit-salon-info-contact/edit-salon-info-contact.component";
import { EditSalonInfoWelcomeTextComponent } from "./maintenance/edit-salon-info/edit-salon-info-welcome-text/edit-salon-info-welcome-text.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { EditSalonUserModalComponent } from "./maintenance/edit-salon-user/edit-salon-user-modal/edit-salon-user-modal.component";
import { ConfirmRemoveUserModalComponent } from "./maintenance/edit-salon-user/confirm-remove-user-modal/confirm-remove-user-modal.component";
import { EditSalonCategoryModalComponent } from "./maintenance/edit-salon-product/edit-salon-category-modal/edit-salon-category-modal.component";
import { MaintenanceBaseFormModalComponent } from "./shared/maintenance-base-form-modal/maintenance-base-form-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoaderComponent,
    NavbarComponent,
    BannerComponent,
    OpenHoursComponent,
    InfoComponent,
    ProductComponent,
    CategoryComponent,
    FeaturesComponent,
    FooterComponent,
    PriceListComponent,
    ProductCardComponent,
    LoginComponent,
    MaintenanceComponent,
    MaintenanceIndexComponent,
    LogoutComponent,
    MaintenanceMenuComponent,
    MaintenanceBaseFormComponent,
    EditSalonProductComponent,
    EditSalonUserComponent,
    EditSalonInfoComponent,
    EditSalonInfoGeneralComponent,
    EditSalonInfoContactComponent,
    EditSalonInfoWelcomeTextComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    EditSalonUserModalComponent,
    ConfirmRemoveUserModalComponent,
    EditSalonCategoryModalComponent,
    MaintenanceBaseFormModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    SharedModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "contact", component: ContactComponent },
      { path: "services", component: ProductComponent },
      {
        path: "maintenance",
        component: MaintenanceComponent,
        children: [
          { path: "", redirectTo: "home", pathMatch: "full" },
          { path: "home", component: MaintenanceIndexComponent },
          { path: "login", component: LoginComponent },
          { path: "logout", component: LogoutComponent },
          { path: "menu", component: MaintenanceMenuComponent },
          { path: "salon", component: EditSalonInfoComponent },
          { path: "product", component: EditSalonProductComponent },
          { path: "user", component: EditSalonUserComponent }
        ]
      }
    ]),
    NgbAlertModule,
    NgbAccordionModule,
    NgbModalModule,
    NgbButtonsModule,
    NgbTimepickerModule,
    NgbModalModule,
    NgbDropdownModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditSalonUserModalComponent,
    ConfirmRemoveUserModalComponent,
    EditSalonCategoryModalComponent
  ]
})
export class AppModule {}
