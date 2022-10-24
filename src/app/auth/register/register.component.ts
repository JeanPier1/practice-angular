import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  });

  public formSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  createuser() {
    this.formSubmitted = true;

    if (this.registerForm.value) {
      console.log("posteando formulario");
      
    } else {
      console.log("formulario no es correcto....");
      
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

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

}
