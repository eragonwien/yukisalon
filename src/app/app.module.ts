import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HeroImgComponent } from './_partials/hero-img/hero-img.component';
import { ContactInfoComponent } from './_partials/contact-info/contact-info.component';
import { ContactMapComponent } from './_partials/contact-map/contact-map.component';
import { ContactOpenHoursComponent } from './_partials/contact-open-hours/contact-open-hours.component';
import { WelcomeComponent } from './_partials/welcome/welcome.component';
import { FeaturedComponent } from './_partials/featured/featured.component';
import { InlineGalleryComponent } from './_partials/inline-gallery/inline-gallery.component';
import { ProductCardComponent } from './_partials/product-card/product-card.component';
import { ProductSectionComponent } from './_partials/product-section/product-section.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Startseite' }},
  { path: 'products', component: ProductsComponent, data: { title: 'Unsere Produkte' }},
  { path: 'about', component: AboutComponent, data: { title: 'Über uns' }},
  { path: 'contact', component: ContactComponent, data: { title: 'Kontakt' }},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
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
    ContactMapComponent,
    ContactOpenHoursComponent,
    WelcomeComponent,
    FeaturedComponent,
    InlineGalleryComponent,
    ProductCardComponent,
    ProductSectionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
