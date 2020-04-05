import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  username: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.username = params.username;
        console.log(this.username);
      }
    )
  }


}
