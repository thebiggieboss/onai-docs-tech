import { DocumentDto } from '@shared/dto/document-dto.interface';

export interface DocumentState {
  list: {
    items: DocumentDto[];
    total: number;
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
  };
  detail: {
    entity: DocumentDto | null;
    loading: boolean;
    error: string | null;
  };
}

export interface DocumentResponse {
  items: DocumentDto[];
  total: number;
}

export interface ITablePagination {
  pageIndex: number;
  pageSize: number;
}
