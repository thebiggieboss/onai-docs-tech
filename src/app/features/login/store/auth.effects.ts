import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthHttpService } from '@app/shared/http-services/auth-http.service';
import { Router } from '@angular/router';
import { HOME } from '@core/constants/pathnames';
import { AuthService } from '@shared/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authHttpService = inject(AuthHttpService);
  router = inject(Router);
  authService = inject(AuthService);
  notification = inject(NzNotificationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authHttpService.login(username, password).pipe(
          map((resp) =>
            AuthActions.loginSuccess({
              accessToken: resp.accessToken,
              user: resp.user,
            }),
          ),
          catchError(() => of(AuthActions.loginFailure({ error: 'Неверный логин или пароль' }))),
        ),
      ),
    ),
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken }) => {
          this.authService.saveToken(accessToken);
          this.router.navigate([HOME]);
        }),
      ),
    { dispatch: false },
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.notification.create('error', 'Ошибка', error);
        }),
      ),
    { dispatch: false },
  );
}
