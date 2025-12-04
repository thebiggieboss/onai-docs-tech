import { on } from '@ngrx/store';
import { HttpState, defaultHttpState } from './http-state';

export function createHttpReducer<T>(actions: { load: any; success: any; failure: any }) {
  return [
    on(actions.load, (state: HttpState<T>) => ({
      ...state,
      loading: true,
      error: null as string | null,
    })),

    on(actions.success, (state: HttpState<T>, { entity }) => ({
      ...state,
      loading: false,
      entity,
      error: null as string | null,
    })),

    on(actions.failure, (state: HttpState<T>, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ];
}
