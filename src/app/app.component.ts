import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public users: Array<{}>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(response => this.users = response["data"]);
  }

}
