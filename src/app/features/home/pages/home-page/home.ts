import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MainLayout } from '@app/layouts/main-layout/main-layout';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { Table } from '@features/home/components/table/table';
import { NzInputModule, NzInputSearchEvent, NzInputWrapperComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CreateModal } from '@features/home/components/create-modal/create-modal';
import { ICreateProps } from '@features/home/interfaces/create.interface';
import { Store } from '@ngrx/store';
import {
  selectDocumentDetail,
  selectDocumentList,
  selectDocumentTotal,
} from '@features/home/store/documents.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  loadDocument,
  loadDocuments,
  resetDocumentsState,
} from '@features/home/store/documents.actions';
import { ITablePagination } from '@features/home/interfaces/home.interface';
import { createDocument } from '@features/home/store/create.actions';
import { updateDocument } from '@features/home/store/update.actions';

@Component({
  selector: 'app-home',
  imports: [
    MainLayout,
    Table,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzFlexModule,
    CreateModal,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  pageIndex = 1;
  pageSize = 10;
  tableLoading = false;

  readonly searchValue = signal('');

  isCreateModal: boolean = false;

  store = inject(Store);

  documents$ = this.store.select(selectDocumentList);
  document$ = this.store.select(selectDocumentDetail);
  tableTotal$ = this.store.select(selectDocumentTotal);

  documentId: number = null;

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetDocumentsState({}));
  }

  onSearch(value: string): void {
    this.searchValue.set(value);
    this.pageIndex = 1;
    this.loadData();
  }

  showCreateModal(): void {
    this.isCreateModal = true;
  }

  closeCreateModal(): void {
    this.isCreateModal = false;
    this.store.dispatch(
      resetDocumentsState({
        resetFields: {
          detail: {
            entity: null,
            loading: false,
            error: null,
          },
        },
      }),
    );
  }

  onCreate(form: ICreateProps): void {
    this.store.dispatch(createDocument({ form }));
    this.closeCreateModal();
  }

  onUpdate(form: ICreateProps): void {
    const id = this.documentId;
    this.store.dispatch(updateDocument({ id, form }));
    this.closeCreateModal();
    this.loadData();
  }

  loadData(): void {
    this.store.dispatch(
      loadDocuments({
        search: this.searchValue(),
        page: this.pageIndex,
        pageSize: this.pageSize,
      }),
    );
  }

  onPageSizeChange(value: ITablePagination): void {
    this.pageSize = value.pageSize;
    this.pageIndex = value.pageIndex;
    this.loadData();
  }

  onChangeDocument(docId: number): void {
    this.isCreateModal = true;
    this.documentId = docId;
    this.store.dispatch(loadDocument({ id: docId }));
  }
}
