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
        headers: new HttpHeaders( { 'Content-Type': 'application/json' })  
      }
      )
  }
}
