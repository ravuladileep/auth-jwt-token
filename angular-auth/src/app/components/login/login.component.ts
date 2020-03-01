import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitlogin() {
    this.auth.loginUser(this.login).subscribe((res) => {
        const token = res['token'];
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

}
