import { inject, Injectable } from '@angular/core';
import { AuthHttpService } from '@app/shared/http-services/auth-http.service';
import { ILogin } from '@app/shared/interfaces/auth-http.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authHttpService = inject(AuthHttpService);

  login(payload: ILogin): void {
    this.authHttpService.login(payload.username, payload.password);
  }
}
