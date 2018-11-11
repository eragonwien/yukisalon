import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BannerComponent } from './shared/banner/banner.component';
import { OpenHoursComponent } from './contact/partials/open-hours/open-hours.component';
import { InfoComponent } from './contact/partials/info/info.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './product/partials/category/category.component';
import { PriceListComponent } from './product/partials/price-list/price-list.component';
import { FeaturesComponent } from './product/partials/features/features.component';
import { ProductCardComponent } from './product/partials/product-card/product-card.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AddWithCredentialsHttpInterceptorService } from './services/add-with-credentials-http-interceptor.service';
import { UnauthorizedHttpInterceptorService } from './services/unauthorized-http-interceptor.service';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SalonService } from './services/salon.service';
import { access } from 'fs';
import { AccountService } from './services/account.service';

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
    MaintenanceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'kontakt', component: ContactComponent },
      { path: 'services', component: ProductComponent },
      { path: 'maintenance', component: MaintenanceComponent }
    ])
  ],
  providers: [
    SalonService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddWithCredentialsHttpInterceptorService, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedHttpInterceptorService, 
      multi: true,
      deps: [SalonService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
