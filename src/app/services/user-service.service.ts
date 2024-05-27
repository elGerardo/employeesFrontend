import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }


  getUsers() {
    return this.httpClient.get(
      'http://localhost/api/user',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  find(id: string) {
    return this.httpClient.get(
      `http://localhost/api/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  store(data: object) {
    return this.httpClient.post(
      'http://localhost/api/user',
      data,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  update(id: string, data: object) {
    return this.httpClient.put(
      `http://localhost/api/user/${id}`,
      data,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  destroy(id: string) {
    return this.httpClient.delete(
      `http://localhost/api/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }
}
