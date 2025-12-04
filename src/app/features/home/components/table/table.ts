import { Component, input, output } from '@angular/core';
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgIf } from '@angular/common';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { ITablePagination } from '@features/home/interfaces/home.interface';

@Component({
  selector: 'app-table',
  imports: [NzTableComponent, NgIf],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  dataSet = input.required<DocumentDto[]>();
  loading = input.required<boolean>();
  pageSize = input.required<number>();
  pageIndex = input.required<number>();
  total = input.required<number>();

  onPagination = output<ITablePagination>();

  get data(): DocumentDto[] {
    return this.dataSet();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.onPagination.emit({ pageIndex, pageSize });
  }
}
