import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentState } from '@features/home/interfaces/home.interface';

export const selectDocumentState = createFeatureSelector<DocumentState>('documents');

export const selectDocumentList = createSelector(
  selectDocumentState,
  (state) => state?.list?.items,
);

export const selectDocumentDetail = createSelector(
  selectDocumentState,
  (state) => state?.detail?.entity,
);

export const selectDocumentTotal = createSelector(selectDocumentState, (state) => state.list.total);
