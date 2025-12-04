import { createAction, props } from '@ngrx/store';
import { ILogin, ILoginResponse } from '@shared/interfaces/auth-http.interface';

export const login = createAction('[Auth] Login', props<ILogin>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<ILoginResponse>(),
);

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
