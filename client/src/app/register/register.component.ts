import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  private matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.parent && control.parent.controls) {
        return control.value === (control.parent.controls as { [key: string]: AbstractControl })[matchTo].value
          ? null : { isMatching: true };
      }
      return null;
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      // this.router.navigateByUrl('/members');
      this.toastr.success('New user saved!');
    }, error => {
      this.validationErrors = error;
      this.toastr.error(this.validationErrors[0]);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
