import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { ILogin } from '@shared/interfaces/auth-http.interface';
import { selectLoading } from '@features/login/store/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    AsyncPipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form: FormGroup;
  fb = inject(FormBuilder);
  store = inject(Store);

  loading$ = this.store.select(selectLoading);

  get validationForm(): boolean {
    return this.form.valid;
  }

  get dataForRequest(): ILogin {
    const form = this.form.controls;
    return {
      username: form['userName'].value,
      password: form['password'].value,
    };
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  warnEmptyField(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  submitForm(): void {
    if (!this.validationForm) {
      this.warnEmptyField();
      return;
    }

    this.store.dispatch(AuthActions.login(this.dataForRequest));
  }
}
