import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from './table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('Table Component', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dataSet', [
      {
        id: 1,
        title: 'СНО',
        author: 'Гитлер',
        status: 'DRAFT',
        updatedAt: '2025-12-04',
        content: 'Аренда помещения',
      },
      {
        id: 2,
        title: 'Договор аренды',
        author: 'Петров',
        status: 'SIGNED',
        updatedAt: '2025-12-03',
        content: 'Подписание долгосрочного договора аренды',
      },
    ]);

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('pageIndex', 1);
    fixture.componentRef.setInput('total', 2);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct data via getter', () => {
    expect(component.data.length).toBe(2);
    expect(component.data[0].id).toBe(1);
  });

  it('should emit pagination event when onQueryParamsChange is called', () => {
    const spy = jasmine.createSpy('paginationSpy');
    component.onPagination.subscribe(spy);

    const params: NzTableQueryParams = {
      pageIndex: 3,
      pageSize: 20,
      sort: [],
      filter: [],
    };

    component.onQueryParamsChange(params);

    expect(spy).toHaveBeenCalledWith({ pageIndex: 3, pageSize: 20 });
  });

  it('should emit change event when change(id) is called', () => {
    const spy = jasmine.createSpy('changeSpy');
    component.onChange.subscribe(spy);

    component.change(123);

    expect(spy).toHaveBeenCalledWith(123);
  });
});
