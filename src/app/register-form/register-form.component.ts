import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  passwordMatcher:boolean = true;
  userExists:boolean = false;
  hide:boolean = true;

  registerForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    repeatPassword: new FormControl('')
  });

  register(): void {
    const formData = this.registerForm.getRawValue();
    if (formData.password === formData.repeatPassword) {
      this.passwordMatcher = true;
      const user = {
        email: formData.email,
        password: formData.password
      }
      this.userService.register(user).subscribe({
        next: (data: any) => {
          if (data.success === true) {
            this.openSuccessDialog();
          }
          else {
            this.userExists = true;
          }
        },
        error: (err) => console.error(err)
      });
    } else {
      this.passwordMatcher = false;
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      data: { 
      heading: 'Success!', 
      body: 'You successfully registered. Please log in to enjoy application',
      button: 'login'
    },
    });
  }

}
