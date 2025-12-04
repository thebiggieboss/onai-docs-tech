import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ILogin, ILoginResponse } from '@app/shared/interfaces/auth-http.interface';
import { of, throwError } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Фейковый логин
  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    const { username, password } = req.body as ILogin;

    if (username === 'admin' && password === '123456') {
      const body: ILoginResponse = {
        accessToken: 'mock-token-123',
        user: { id: 1, name: 'Admin User', username: 'admin' },
      };
      return of(new HttpResponse({ status: 200, body }));
    }

    // корректный HttpErrorResponse
    return throwError(() => new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: { message: 'Invalid credentials' }
    }));
  }

  // Для всех остальных запросов
  return next(req);
};
