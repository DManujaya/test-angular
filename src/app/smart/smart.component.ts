import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.css'],
})
export class SmartComponent implements OnInit {
  list = new Array<Post>();
  interval: any;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    // this.service.getPosts().subscribe((response) => {
    //   console.log(response)
    //   this.list = response.map((item) => {
    //     return new Post(item.body, item.id, item.title, item.userId);
    //   });
    // });
    this.getAds();
  }

  getAds() {
    this.interval = setInterval(() => {
      this.service.getPosts().subscribe((response) => {
        console.log(response);
        this.list = response.map((item) => {
          return new Post(item.body, item.id, item.title, item.userId);
        });
      });
    }, 3000);
  }
}
