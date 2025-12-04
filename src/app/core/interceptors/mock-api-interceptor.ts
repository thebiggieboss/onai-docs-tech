import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ILogin, ILoginResponse } from '@app/shared/interfaces/auth-http.interface';
import { from, of, switchMap, throwError } from 'rxjs';
import { DocumentResponse } from '@features/home/interfaces/home.interface';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { ICreateProps } from '@features/home/interfaces/create.interface';

let mockDocuments: DocumentResponse | null = null;
let nextId = 1;

const loadDocuments = async () => {
  if (!mockDocuments) {
    const response = await fetch('/assets/mock/documents.json');
    mockDocuments = await response.json();
    nextId = mockDocuments.items.length + 1;
  }
  return mockDocuments;
};

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    const { username, password } = req.body as ILogin;

    if (username === 'admin' && password === '123456') {
      const body: ILoginResponse = {
        accessToken: 'mock-token-123',
        user: { id: 1, name: 'Admin User', username: 'admin' },
      };
      return of(new HttpResponse({ status: 200, body }));
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          error: { message: 'Invalid credentials' },
        }),
    );
  }

  if (
    req.url.startsWith('/documents') &&
    req.method === 'GET' &&
    !req.url.match(/\/documents\/\d+$/)
  ) {
    return from(loadDocuments()).pipe(
      switchMap((data) => {
        const docs = data.items; // массив документов

        const params = req.params;
        const search = params.get('search') ?? '';
        const page = Number(params.get('page') ?? 1);
        const pageSize = Number(params.get('pageSize') ?? 10);

        let filtered = docs;

        if (search.trim()) {
          filtered = filtered.filter((doc) =>
            doc.title.toLowerCase().includes(search.toLowerCase()),
          );
        }

        const start = (page - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize);

        return of(
          new HttpResponse({
            status: 200,
            body: {
              items,
              total: filtered.length,
            },
          }),
        );
      }),
    );
  }

  if (req.url.match(/\/documents\/\d+$/) && req.method === 'GET') {
    return from(loadDocuments()).pipe(
      switchMap((data) => {
        const docs = data.items;

        const id = Number(req.url.split('/').pop());
        const doc = docs.find((d) => d.id === id);

        if (!doc) {
          return throwError(
            () =>
              new HttpErrorResponse({
                status: 404,
                error: { message: 'Document not found' },
              }),
          );
        }

        return of(new HttpResponse({ status: 200, body: doc }));
      }),
    );
  }

  if (req.url.endsWith('/documents') && req.method === 'POST') {
    const form = req.body as ICreateProps;

    return from(loadDocuments()).pipe(
      switchMap((data) => {
        const formatted = form.datePicker.toISOString().split('T')[0];
        const newDoc: DocumentDto = {
          id: nextId++,
          title: form.title || 'Без названия',
          author: 'Неизвестно',
          status: 'DRAFT',
          updatedAt: formatted,
          content: form.content || '',
        };

        data.items.unshift(newDoc);

        return of(new HttpResponse({ status: 201, body: newDoc }));
      }),
    );
  }

  if (req.url.match(/\/documents\/\d+$/) && req.method === 'PUT') {
    const form = req.body as Partial<DocumentDto>;

    return from(loadDocuments()).pipe(
      switchMap((data) => {
        const id = Number(req.url.split('/').pop());
        const index = data.items.findIndex((d) => d.id === id);

        if (index === -1) {
          return throwError(
            () =>
              new HttpErrorResponse({
                status: 404,
                error: { message: 'Document not found' },
              }),
          );
        }

        const updated = {
          ...data.items[index],
          ...form,
          updatedAt: new Date().toISOString().split('T')[0], // обновляем дату
        };

        data.items[index] = updated;

        return of(new HttpResponse({ status: 200, body: updated }));
      }),
    );
  }

  return next(req);
};
