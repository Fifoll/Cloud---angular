import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('test5@test.pl', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('password', { nonNullable: true, validators: [Validators.required] })
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
          localStorage.setItem('authToken', data.data);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if(err.status === 401) {
          console.log("auth failed");
        }
      }
    })
  }

}
