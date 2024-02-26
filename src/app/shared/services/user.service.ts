import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  post(user: IUser): Observable<any> {
    return this.http.post(this.url, user);
  }

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
}
