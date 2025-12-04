import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as UpdateActions from './update.actions';
import { DocumentsHttpService } from '@features/home/services/documents-http.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class UpdateDocumentEffects {
  actions$ = inject(Actions);
  documentService = inject(DocumentsHttpService);
  notification = inject(NzNotificationService);

  updateDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateActions.updateDocument),
      mergeMap(({ id, form }) =>
        this.documentService.updateDocument(id, form).pipe(
          map((document) => UpdateActions.updateDocumentSuccess({ document })),
          catchError((err) =>
            of(
              UpdateActions.updateDocumentFailure({
                error: err.message || 'Ошибка создания документа',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateDocumentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateActions.updateDocumentSuccess),
        tap((res) => {
          this.notification.create('success', 'Успех', 'Документ успешно обнавлен');
        }),
      ),
    { dispatch: false },
  );
}
