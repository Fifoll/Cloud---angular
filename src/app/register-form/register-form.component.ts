import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private userService: UserService){}

  passwordMatcher = true;

  registerForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    repeatPassword: new FormControl('')
  });

  register() {
    const formData = this.registerForm.getRawValue();
    if(formData.password === formData.repeatPassword) {
      const user = {
        email: formData.email,
        password: formData.password
      }
      this.userService.register(user).subscribe({
        next: (data: any) => {
          if(data.success === true) {
            // todo
          }
        },
        error: (err) => console.error(err)
      });
    } else {
      this.passwordMatcher = false;
    }
  }

}
