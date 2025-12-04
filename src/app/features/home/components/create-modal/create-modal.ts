import { Component, forwardRef, inject, input, OnInit, output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject } from 'rxjs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { ICreateProps } from '@features/home/interfaces/create.interface';
import { DocumentDto } from '@shared/dto/document-dto.interface';

@Component({
  selector: 'app-create-modal',
  imports: [
    NzModalModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerComponent,
  ],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateModal),
      multi: true,
    },
  ],
})
export class CreateModal implements ControlValueAccessor, OnInit {
  fillData = input<DocumentDto>(null);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  _value: boolean;
  isOkLoading = false;

  closeModal = output<void>();
  create = output<ICreateProps>();
  update = output<ICreateProps>();

  validateForm = this.fb.group({
    title: this.fb.control('', Validators.required),
    content: this.fb.control('', Validators.required),
    type: this.fb.control('', Validators.required),
    datePicker: this.fb.control<Date | null>(null, Validators.required),
  });

  get formData(): ICreateProps {
    const form = this.validateForm.controls;

    return {
      title: form['title'].value,
      content: form['content'].value,
      type: form['type'].value,
      datePicker: form['datePicker'].value,
    };
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  get value(): boolean {
    return this._value;
  }

  set value(value: boolean) {
    if (value !== undefined && this.value !== value) {
      this._value = value;
      this.onChange(value);
      this.onTouch(value);
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }

  handleCancel(): void {
    this.closeModal.emit();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.fillData() !== null) {
        this.update.emit(this.formData);
        return;
      }
      this.create.emit(this.formData);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.fillData() !== null) {
      const { title, content, updatedAt } = this.fillData();
      this.validateForm.patchValue({
        title,
        content,
        datePicker: updatedAt ? new Date(updatedAt) : null,
      });
    }
  }
}
