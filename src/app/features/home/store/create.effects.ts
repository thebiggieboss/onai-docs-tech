import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as CreateActions from './create.actions';
import { DocumentsHttpService } from '@features/home/services/documents-http.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class CreateDocumentEffects {
  actions$ = inject(Actions);
  documentService = inject(DocumentsHttpService);
  notification = inject(NzNotificationService);

  createDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateActions.createDocument),
      mergeMap(({ form }) =>
        this.documentService.createDocument(form).pipe(
          map((document) => CreateActions.createDocumentSuccess({ document })),
          catchError((err) =>
            of(
              CreateActions.createDocumentFailure({
                error: err.message || 'Ошибка создания документа',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  createDocumentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateActions.createDocumentSuccess),
        tap((res) => {
          this.notification.create('success', 'Успех', 'Документ успешно создан');
        }),
      ),
    { dispatch: false },
  );
}
