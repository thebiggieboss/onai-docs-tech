import { Component, OnInit, signal } from '@angular/core';
import { MainLayout } from '@app/layouts/main-layout/main-layout';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { Table } from '@features/home/components/table/table';
import { NzInputModule, NzInputSearchEvent, NzInputWrapperComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CreateModal } from '@features/home/components/create-modal/create-modal';
import { ICreateProps } from '@features/home/interfaces/create.interface';

@Component({
  selector: 'app-home',
  imports: [
    MainLayout,
    Table,
    NzInputModule,
    NzInputWrapperComponent,
    FormsModule,
    NzButtonModule,
    NzFlexModule,
    CreateModal,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  dataSet: DocumentDto[] = [];

  pageIndex = 0;
  pageSize = 10;
  tableLoading = false;

  readonly value = signal('');

  isCreateModal: boolean = false;

  ngOnInit(): void {
    this.dataSet = [
      {
        id: 1,
        title: 'СНО',
        author: 'Гитлер',
        status: 'DRAFT',
        updatedAt: '2025-12-04',
        content: 'Аренда помещения',
      },
    ];
  }

  onSearch(event: NzInputSearchEvent): void {
    console.log(event);
  }

  showCreateModal(): void {
    this.isCreateModal = true;
  }

  closeCreateModal(): void {
    this.isCreateModal = false;
  }

  onCreate(form: ICreateProps): void {}
}
