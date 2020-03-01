import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: any = {};
  constructor(private auth: AuthService) {}
  ngOnInit(): void {

  }
  onSubmitReg() {
    this.auth.registerUser(this.register).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
