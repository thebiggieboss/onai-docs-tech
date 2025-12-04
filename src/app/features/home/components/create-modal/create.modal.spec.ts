import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateModal } from './create-modal';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DocumentDto } from '@shared/dto/document-dto.interface';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CreateModal', () => {
  let component: CreateModal;
  let fixture: ComponentFixture<CreateModal>;

  const mockDocument: DocumentDto = {
    id: 1,
    title: 'Old Title',
    author: 'Author',
    status: 'DRAFT',
    updatedAt: '2025-12-04T00:00:00Z',
    content: 'Old content',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateModal,
        ReactiveFormsModule,
        NzModalModule,
        NzCheckboxModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzTimePickerModule,
        NzDatePickerComponent,
      ],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations(), FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModal);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('fillData', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when handleCancel is called', () => {
    const spy = spyOn(component.closeModal, 'emit');
    component.handleCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit create when submitForm is called and fillData is null', () => {
    const spy = spyOn(component.create, 'emit');

    component.validateForm.setValue({
      title: 'New Title',
      content: 'New Content',
      type: 'type1',
      datePicker: new Date(),
    });

    component.submitForm();

    expect(spy).toHaveBeenCalledWith(component.formData);
  });

  it('should emit update when submitForm is called and fillData exists', () => {
    const spy = spyOn(component.update, 'emit');

    fixture.componentRef.setInput('fillData', mockDocument);
    fixture.detectChanges();

    component.validateForm.setValue({
      title: 'Updated Title',
      content: 'Updated Content',
      type: 'type1',
      datePicker: new Date(),
    });

    component.submitForm();

    expect(spy).toHaveBeenCalledWith(component.formData);
  });

  it('should patch form values in ngOnInit if fillData exists', () => {
    fixture.componentRef.setInput('fillData', mockDocument);
    fixture.detectChanges();
    component.ngOnInit();

    const form = component.validateForm.controls;
    expect(form['title'].value).toBe(mockDocument.title);
    expect(form['content'].value).toBe(mockDocument.content);
    expect(form['datePicker'].value?.toISOString()).toBe(
      new Date(mockDocument.updatedAt).toISOString(),
    );
  });
});
