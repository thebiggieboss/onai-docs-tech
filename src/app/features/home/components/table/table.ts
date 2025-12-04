import { Component, input } from '@angular/core';
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgIf } from '@angular/common';
import { DocumentDto } from '@shared/dto/document-dto.interface';

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

  get data(): DocumentDto[] {
    return this.dataSet();
  }

  get total(): number {
    return this.data.length;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {}
}
