import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  private erroHandler(error:any, message:any) {
      console.error(error);
      this.snackbar.open(message, 'Error', {
        duration: 5000,
      });
    }
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
      this.loginForm = this.formbuilder.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  onSubmit() {
      this.authService.checkLogin(this.loginForm.value).subscribe(
        data => {
          // tslint:disable-next-line: no-string-literal
          this.router.navigate(['app/incident']);
        }, err =>  {
          this.erroHandler(err, err.error.message);
          this.router.navigate(['login']);
          this.loginForm.reset();
        }
      );
    }
}
