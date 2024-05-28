import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as EnvJson from 'env.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }


  getUsers(query: string) {
    console.log(`${EnvJson.EMPLOYEE_BASE_URL}/user?${query}`)
    return this.httpClient.get(
      `${EnvJson.EMPLOYEE_BASE_URL}/user?${query}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  find(id: string) {
    return this.httpClient.get(
      `${EnvJson.EMPLOYEE_BASE_URL}/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  store(data: object) {
    return this.httpClient.post(
      `${EnvJson.EMPLOYEE_BASE_URL}/user`,
      data
    )
  }

  update(id: string, data: object) {
    return this.httpClient.post(
      `${EnvJson.EMPLOYEE_BASE_URL}/user/${id}`,
      data
    )
  }

  destroy(id: string) {
    return this.httpClient.delete(
      `${EnvJson.EMPLOYEE_BASE_URL}/user/${id}`,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }
}
