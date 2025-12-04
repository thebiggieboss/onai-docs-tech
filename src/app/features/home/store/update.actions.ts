import { createAction, props } from '@ngrx/store';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { ICreateProps } from '../interfaces/create.interface';

export const updateDocument = createAction(
  '[Documents] Update Document',
  props<{ id: number; form: ICreateProps }>(),
);

export const updateDocumentSuccess = createAction(
  '[Documents] Update Document Success',
  props<{ document: DocumentDto }>(),
);

export const updateDocumentFailure = createAction(
  '[Documents] Update Document Failure',
  props<{ error: string }>(),
);
