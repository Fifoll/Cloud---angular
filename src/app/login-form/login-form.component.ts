import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  incorrectData:boolean = false;
  hide:boolean = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  login() {
    if (this.loginForm && this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.getRawValue();
    this.userService.login(user).subscribe({
      next: (data: any) => {
        if (data.status === 200) {
          this.authService.setToken(data.data);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        if(err.status === 401) {
          this.incorrectData = true;
        }
        else{ 
          console.error(err);
        }
      }
    })
  }

}
