import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { DocumentResponse } from '@features/home/interfaces/home.interface';
import { ICreateProps } from '@features/home/interfaces/create.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentsHttpService {
  http = inject(HttpClient);

  getDocuments(search: string, page: number, pageSize: number): Observable<DocumentResponse> {
    return this.http.get<DocumentResponse>(`/documents`, {
      params: { search, page, pageSize },
    });
  }

  getDocumentById(id: number): Observable<DocumentDto> {
    return this.http.get<DocumentDto>(`/documents/${id}`);
  }

  createDocument(form: ICreateProps): Observable<DocumentDto> {
    return this.http.post<DocumentDto>('/documents', form);
  }

  updateDocument(id: number, form: ICreateProps) {
    return this.http.put<DocumentDto>(`/documents/${id}`, form);
  }
}
