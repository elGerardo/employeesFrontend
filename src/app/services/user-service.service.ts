import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.employees_base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }


  getUsers(query: string) {
    return this.httpClient.get(
      `${baseUrl}/user?${query}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  find(id: string) {
    return this.httpClient.get(
      `${baseUrl}/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  store(data: object) {
    return this.httpClient.post(
      `${baseUrl}/user`,
      data
    )
  }

  update(id: string, data: object) {
    return this.httpClient.post(
      `${baseUrl}/user/${id}`,
      data
    )
  }

  destroy(id: string) {
    return this.httpClient.delete(
      `${baseUrl}/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }
}
