import { createAction, props } from '@ngrx/store';
import { DocumentDto } from '@shared/dto/document-dto.interface';

export const loadDocuments = createAction(
  '[Documents] Load Documents',
  props<{ search: string; page: number; pageSize: number }>(),
);

export const loadDocumentsSuccess = createAction(
  '[Documents] Load Documents Success',
  props<{ items: DocumentDto[]; total: number }>(),
);

export const loadDocumentsFailure = createAction(
  '[Documents] Load Documents Failure',
  props<{ error: string }>(),
);

export const loadDocument = createAction('[Documents] Load Document', props<{ id: number }>());

export const loadDocumentSuccess = createAction(
  '[Documents] Load Document Success',
  props<{ entity: DocumentDto }>(),
);

export const loadDocumentFailure = createAction(
  '[Documents] Load Document Failure',
  props<{ error: string }>(),
);
