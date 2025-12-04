import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadDocument,
  loadDocumentFailure,
  loadDocuments,
  loadDocumentsSuccess,
  loadDocumentSuccess,
} from '@features/home/store/documents.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { DocumentsHttpService } from '@features/home/services/documents-http.service';

@Injectable()
export class DocumentsEffects {
  actions$ = inject(Actions);
  documentsHttpService = inject(DocumentsHttpService);

  loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocuments),
      switchMap(({ search, page, pageSize }) =>
        this.documentsHttpService.getDocuments(search, page, pageSize).pipe(
          map((res) => loadDocumentsSuccess({ items: res.items, total: res.total })),
          catchError((err) => of(loadDocumentFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  loadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocument),
      switchMap(({ id }) =>
        this.documentsHttpService.getDocumentById(id).pipe(
          map((entity) => loadDocumentSuccess({ entity })),
          catchError((err) => of(loadDocumentFailure({ error: err.message }))),
        ),
      ),
    ),
  );
}
