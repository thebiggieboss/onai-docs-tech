import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from '@features/login/store/auth.reducer';
import { AuthEffects } from '@features/login/store/auth.effects';
import { mockApiInterceptor } from '@core/interceptors/mock-api-interceptor';
import { documentsReducer } from '@features/home/store/documents.reducer';
import { DocumentsEffects } from '@features/home/store/documents.effects';
import { CreateDocumentEffects } from '@features/home/store/create.effects';
import { UpdateDocumentEffects } from '@features/home/store/update.effects';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideStore({
      auth: authReducer,
      documents: documentsReducer,
    }),
    provideEffects([AuthEffects, DocumentsEffects, CreateDocumentEffects, UpdateDocumentEffects]),
  ],
};
