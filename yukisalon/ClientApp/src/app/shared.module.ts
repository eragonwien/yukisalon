import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountService } from "./services/account.service";
import { SalonService } from "./services/salon.service";
import { AddWithCredentialsHttpInterceptorService } from "./services/add-with-credentials-http-interceptor.service";
import { UnauthorizedHttpInterceptorService } from "./services/unauthorized-http-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  imports: [CommonModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AccountService,
        SalonService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AddWithCredentialsHttpInterceptorService,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnauthorizedHttpInterceptorService,
          multi: true
        }
      ]
    };
  }
}
