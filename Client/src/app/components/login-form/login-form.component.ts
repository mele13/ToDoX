import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {  
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  isFocused: boolean = false;
  error: boolean = false;

  @ViewChild('emailLabel') emailLabel!: ElementRef;
  @ViewChild('passwordLabel') passwordLabel!: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.required]] //PasswordValidator.strong()
    });
  }

  onFocus(event: any, label: any) {
    this.isFocused = true;
    label.classList.add('focused');
  }

  onBlur(event: any, label: any) {
    if (!event.target.value) {
      this.isFocused = false;
      label.classList.remove('focused');
    }
  }

  onError(label: ElementRef) {
    this.error = true;
    label.nativeElement.style.boxShadow = '0px 0px 7px rgba(255, 113, 113)';
  }

  resetErrors() {
    this.error = false;
    this.emailLabel.nativeElement.style.boxShadow = 'none';
    this.passwordLabel.nativeElement.style.boxShadow = 'none';
  }

  goBack() {
    this.router.navigate(['/..']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() { // Rev frontend validation
    console.log(this.loginForm.value);

    if (this.error) this.resetErrors();

    const emailErrors: ValidationErrors | null | undefined = this.loginForm.get('email')?.errors;
    const passwordErrors: ValidationErrors | null | undefined = this.loginForm.get('password')?.errors;

    if (emailErrors || passwordErrors) {
      if (emailErrors) this.onError(this.emailLabel);
      if (passwordErrors) this.onError(this.passwordLabel);
    } else { // Api connection
      const { email, password } = this.loginForm.value;
      console.log(email, password)
      this.userService.authenticateUser(email, password).subscribe(
        (response) => {
          // If the authentification is successful, the token is saved in the LocalStorage - REV
          localStorage.setItem('authToken', response.token);
          // The user is redirected to the boards page
          this.router.navigate(['boards']);
        }, (error) => {
          // Display an error message
          this.onError(this.emailLabel);
          this.onError(this.passwordLabel);
          console.log("Error authenticating user", error);
        }
      )
    }
  }
}