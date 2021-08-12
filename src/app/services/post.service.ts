import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) {}

  cache = {};

  // public getPosts(): Observable<Post[]> {
  //   return this.httpClient.get<Post[]>(this.url);
  // }

  public getPosts(): Observable<any> {
    if (this.cache["posts"]) {
      console.log('Returning cached value!');
      return this.cache["posts"];
    }
    console.log('Do the request again');
    // this.httpClient.get<Post[]>(this.url).pipe(
    //   tap((resolvedValue) => {
    //     console.log(resolvedValue)
    //     this.cache["posts"] = resolvedValue;
    //   })
    // );
    this.cache["posts"] = this.httpClient.get<Post[]>(this.url);
    return this.cache["posts"];
  }
}

