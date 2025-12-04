import { createReducer, on } from '@ngrx/store';
import {
  loadDocument,
  loadDocumentFailure,
  loadDocuments,
  loadDocumentsFailure,
  loadDocumentsSuccess,
  loadDocumentSuccess,
  resetDocumentsState,
} from '@features/home/store/documents.actions';
import { DocumentState } from '@features/home/interfaces/home.interface';
import { createDocumentSuccess } from '@features/home/store/create.actions';

export const initialState: DocumentState = {
  list: {
    items: [],
    total: 0,
    loading: false,
    error: null as string | null,
    page: 1,
    pageSize: 10,
  },
  detail: {
    entity: null,
    loading: false,
    error: null as string | null,
  },
};

export const documentsReducer = createReducer(
  initialState,
  // LIST
  on(loadDocuments, (state, { page, pageSize }) => ({
    ...state,
    list: {
      ...state.list,
      loading: true,
      page,
      pageSize,
      error: null as string | null,
    },
  })),

  on(loadDocumentsSuccess, (state, { items, total }) => ({
    ...state,
    list: {
      ...state.list,
      loading: false,
      items,
      total,
    },
  })),

  on(loadDocumentsFailure, (state, { error }) => ({
    ...state,
    list: { ...state.list, loading: false, error },
  })),

  // DETAIL
  on(loadDocument, (state) => ({
    ...state,
    detail: { ...state.detail, loading: true, error: null as string | null },
  })),

  on(loadDocumentSuccess, (state, { entity }) => ({
    ...state,
    detail: { ...state.detail, loading: false, entity },
  })),

  on(loadDocumentFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, loading: false, error },
  })),

  on(createDocumentSuccess, (state, { document }) => ({
    ...state,
    list: {
      ...state.list,
      items: [document, ...state.list.items],
      total: state.list.total + 1,
    },
  })),

  on(resetDocumentsState, (state, { resetFields }) => {
    if (!resetFields) {
      return initialState;
    }

    return {
      ...state,
      ...resetFields,
    };
  }),
);
