import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: UsuarioService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '667879766751-lb14afc9qpep7nirnd8hkeuuiim4ih9b.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      /*document.getElementById('buttonDiv'),*/
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    console.log('Encode JWT ID token: ' + response.credential);
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
}
