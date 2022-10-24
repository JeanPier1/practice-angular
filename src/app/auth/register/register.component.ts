import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group(
    {
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      Validators: this.passwordsIguales('password', 'password2'),
    }
  );

  public formSubmitted = false;

  constructor(private fb: FormBuilder, private service: UsuarioService) {}

  ngOnInit(): void {}

  createuser() {
    this.formSubmitted = true;

    if (this.registerForm.value) {
      console.log('posteando formulario');

      this.service.crearUsuario(this.registerForm.value).subscribe(
        (resp) => {
          console.log('Usuario creado');
          console.log(resp);
        },
        (err) => console.warn(err)
      );
    } else {
      console.log('formulario no es correcto....');
    }

    console.log(this.registerForm.value);
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasValidas() {
    const pass1 = this.registerForm.get('password')?.value;

    const pass2 = this.registerForm.get('password2')?.value;

    return pass1 !== pass2 && this.formSubmitted ? true : false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      return pass1Control === pass2Control
        ? pass2Control?.setErrors(null)
        : pass2Control?.setErrors({ noEsIgual: true });
    };
  }
}
