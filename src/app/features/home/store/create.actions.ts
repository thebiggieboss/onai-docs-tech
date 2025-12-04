import { createAction, props } from '@ngrx/store';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { ICreateProps } from '@features/home/interfaces/create.interface';

export const createDocument = createAction(
  '[Documents] Create Document',
  props<{ form: ICreateProps }>(),
);

export const createDocumentSuccess = createAction(
  '[Documents] Create Document Success',
  props<{ document: DocumentDto }>(),
);

export const createDocumentFailure = createAction(
  '[Documents] Create Document Failure',
  props<{ error: string }>(),
);
