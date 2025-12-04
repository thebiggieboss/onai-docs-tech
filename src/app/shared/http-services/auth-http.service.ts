import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '@shared/interfaces/auth-http.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  http = inject(HttpClient);

  login(username: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/auth/login', { username, password });
  }
}
