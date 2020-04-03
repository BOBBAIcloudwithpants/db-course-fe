import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  register(username: string, password: string, is_admin: any){
    console.log(username, password, is_admin);
    const formData = new URLSearchParams();
    formData.set('username',username);
    formData.set('password', password);
    


  }

  login(username: string, password: string){
    console.log(username, password);
  }

}
