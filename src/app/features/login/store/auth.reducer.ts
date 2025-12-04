import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUserInfo } from '@shared/interfaces/auth-http.interface';

export interface AuthState {
  user: IUserInfo | null;
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null as string | null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null as string | null,
  })),

  on(AuthActions.loginSuccess, (state, { accessToken, user }) => ({
    ...state,
    loading: false,
    token: accessToken,
    user,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
