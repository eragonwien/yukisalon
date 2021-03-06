import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './_partials/navigation/navigation.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { HeroImgComponent } from './_partials/hero-img/hero-img.component';
import { ContactInfoComponent } from './_partials/contact-info/contact-info.component';
import { ContactOpenHoursComponent } from './_partials/contact-open-hours/contact-open-hours.component';
import { WelcomeComponent } from './_partials/welcome/welcome.component';
import { FeaturedComponent } from './_partials/featured/featured.component';
import { InlineGalleryComponent } from './_partials/inline-gallery/inline-gallery.component';
import { ProductSectionComponent } from './_partials/product-section/product-section.component';
import { CategorieSectionComponent } from './_partials/categorie-section/categorie-section.component';
import { PriceListComponent } from './_partials/price-list/price-list.component';
import { CategoriesCardListComponent } from './_partials/categories-card-list/categories-card-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Yuki Tuyet Spa' }},
  { path: 'products', component: ProductsComponent, data: { title: 'Unsere Produkte' }},
  { path: 'about', component: AboutComponent, data: { title: 'Über uns' }},
  { path: 'contact', component: ContactComponent, data: { title: 'Kontakt' }},
  { path: '**', component: PageNotFoundComponent, data: { title: 'Seite nicht gefunden' }}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    ProductsComponent,
    NavigationComponent,
    FooterComponent,
    HeroImgComponent,
    ContactInfoComponent,
    ContactOpenHoursComponent,
    WelcomeComponent,
    FeaturedComponent,
    InlineGalleryComponent,
    ProductSectionComponent,
    CategorieSectionComponent,
    PriceListComponent,
    CategoriesCardListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    HttpClientModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
