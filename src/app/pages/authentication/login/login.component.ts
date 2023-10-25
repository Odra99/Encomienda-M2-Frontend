import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/backend/auth.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  credentials = {
    password: null,
    email: null,
  };

  showPass = false;
  @ViewChild('loginForm', { read: NgForm }) form!: NgForm;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService
  ) {}

  signIn() {
    this.form.form.markAllAsTouched();
    if (this.form.form.invalid) {
      return;
    }
    if (!this.credentials.password || !this.credentials.email) {
      return;
    }

    this.authService.login(this.credentials);
  }
}
