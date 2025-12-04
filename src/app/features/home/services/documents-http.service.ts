import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { DocumentResponse } from '@features/home/interfaces/home.interface';

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
}
