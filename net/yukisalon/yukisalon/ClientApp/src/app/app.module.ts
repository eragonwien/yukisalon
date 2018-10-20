import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ContactComponent } from './contact/contact.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BannerComponent } from './shared/banner/banner.component';
import { OpenHoursComponent } from './contact/partials/open-hours/open-hours.component';
import { InfoComponent } from './contact/partials/info/info.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './product/partials/category/category.component';
import { FeaturesComponent } from './product/partials/features/features.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ContactComponent,
    LoaderComponent,
    NavbarComponent,
    BannerComponent,
    OpenHoursComponent,
    InfoComponent,
    ProductComponent,
    CategoryComponent,
    FeaturesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'kontakt', component: ContactComponent },
      { path: 'dienstleistung', component: ProductComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
