import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  credentials = {
    password: null,
    userName: null,
  };

  showPass = false;
  @ViewChild('loginForm', { read: NgForm }) form!: NgForm;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService
  ) {}

  signIn() {
    this.form.form.markAllAsTouched();
    if(!this.credentials.password || !this.credentials.userName ){
      return
    }
    if (
      this.credentials.userName == 'user' &&
      this.credentials.password == 'password'
    ) {
      this.toasterService.show({
        message: 'Inicio de sesion exitoso',
        type: ToasterEnum.SUCCESS,
      });
    } else {
      this.toasterService.show({
        message: 'Credenciales incorrectas',
        type: ToasterEnum.ERROR,
      });
    }

    // this.authService.login(this.credentials).subscribe({
    //   next:()=> {
    //     console.log("Success")
    //   },
    //   error:()=> {
    //     console.log("error")
    //   },
    // })
  }
}
