import { Component, inject, OnInit, signal } from '@angular/core';
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
import { selectDocumentList, selectDocumentTotal } from '@features/home/store/documents.selectors';
import { AsyncPipe } from '@angular/common';
import { loadDocuments } from '@features/home/store/documents.actions';
import { ITablePagination } from '@features/home/interfaces/home.interface';

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
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  dataSet: DocumentDto[] = [];

  pageIndex = 1;
  pageSize = 10;
  tableLoading = false;

  readonly searchValue = signal('');

  isCreateModal: boolean = false;

  store = inject(Store);

  documents$ = this.store.select(selectDocumentList);
  tableTotal$ = this.store.select(selectDocumentTotal);

  ngOnInit(): void {
    this.loadData();
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
  }

  onCreate(form: ICreateProps): void {}

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
}
