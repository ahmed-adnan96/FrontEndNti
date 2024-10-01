import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/shared/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errMasg!: string;
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),  
    })


  }



  handleForm() {
    this.isLoading = true;
    const loginData = this.loginForm.value;
    console.log(loginData);
    if (this.loginForm.valid === true) {
      this._AuthService.LoginUser(loginData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "User logged in successfully") {
            this.isLoading = false 
            localStorage.setItem("USER" , res.token)
            this._AuthService.decodeUser();
            this._Router.navigate(['/home'])


          }

        },
        error: (err) => {
          console.log("error => ", err);
          this.isLoading = false
          this.errMasg = err.error.errors[1].msg
        }
      })
    }

  }
}
