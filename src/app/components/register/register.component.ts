import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/shared/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errMasg!: string;
  isLoading: boolean = false;
  // repas: FormGroup;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
      rePassword: new FormControl(''),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, { validators: [this.checkPassw] } as FormControlOptions)


  }


  checkPassw(g1: FormGroup): void {
    const password = g1.get('password')
    const rePassword = g1.get('rePassword');
    if (rePassword?.value == "") {
      rePassword?.setErrors({ required: true })

    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }
  handleForm() {
    this.isLoading = true;
    const registerData = this.registerForm.value;
    console.log(registerData);
    if (this.registerForm.valid === true) {
      this._AuthService.Register(registerData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "User created successfully") {
            this.isLoading = false 
            this._Router.navigate(['/login'])


          }

        },
        error: (err) => {
          console.log("error => ", err);
          this.isLoading = false
          this.errMasg = err.error.message
        }
      })
    }

  }





}
