import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginSigninService } from '../login-signin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginSigninService, private snackbar: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
  }

  register(username: string, password: string, is_admin: any) {
    const path = '/login/register';
    let t = 0
    if (is_admin) {
      t = 1
    }
    let data = {
      username: username,
      password: password,
      is_admin: t
    }
    this.service.sendPostRequest(data, path).subscribe(res => {
      if (res.status == 200) {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
        this.route.navigateByUrl("/user/" + username);
      }
      else {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
      }
    })
  }

  login(username: string, password: string) {
    const path = '/login/';


    let data = {
      username: username,
      password: password
    }
    this.service.sendPostRequest(data, path).subscribe(res => {
      if (res.status == 200) {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
        this.route.navigateByUrl('/user/' + username);

      }
      else {
        this.snackbar.open(res.msg, "close", {
          duration: 2000
        })
      }
    })
  }

}
