import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.service.login(this.loginForm.value as any).subscribe(
      (data: any) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.value.email as any);
        } else {
          localStorage.removeItem('email');
        }
        console.log(data);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    /* this.route.navigateByUrl('/');*/
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
    await this.service.googleInit();
    this.auth2 = this.service.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.service.loginGoogle(id_token).subscribe((resp) => {
          // Navegar al Dashboard
          this.ngZone.run(() => {
            this.route.navigateByUrl('/');
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
