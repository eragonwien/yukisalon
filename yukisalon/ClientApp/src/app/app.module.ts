import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SalonInfoComponent } from './maintenance/salon-info/salon-info.component';
import { MaintenanceIndexComponent } from './maintenance/index/index.component';
import { SharedModule } from './shared.module';

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
    SalonInfoComponent,
    MaintenanceIndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    SharedModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent },
      { path: 'services', component: ProductComponent },
      { path: 'maintenance', component: MaintenanceComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: MaintenanceIndexComponent },
        { path: 'login', component: LoginComponent },
        { path: 'salon', component: SalonInfoComponent },
        { path: 'contact', component: SalonInfoComponent },
        { path: 'user', component: SalonInfoComponent },
      ]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
