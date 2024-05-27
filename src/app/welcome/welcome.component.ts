import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public users: Array<{}>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userService.getUsers().subscribe(response => this.users = response["data"]);
  }

  handleUpdate(row: any) {
    this.router.navigate(['/employees/', row.id]);
  }

  handleDelete(row: any) {
    this.userService.destroy(row.id).subscribe(_response => { this.loadData() }, error => console.log(error));
  }

}
