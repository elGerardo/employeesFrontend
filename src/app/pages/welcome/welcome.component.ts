import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public users: Array<{}> = null;
  isLoading: boolean = true;
  searchControl = new FormControl();
  showToast: boolean = false;
  queryField: string = 'name'
  toastMessage: string = ""
  toastClass: string = "bg-success"
  toastIcon: string = "bi bi-cloud-check"

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadData();
    this.searchControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.loadData("search=" + JSON.stringify({ 'field': this.queryField, 'value': value }))
    });
  }

  loadData(query: string = "") {
    this.isLoading = true;
    this.userService.getUsers(query).subscribe(response => {
      this.users = response["data"]
      this.isLoading = false;
    }
      , _error => {
        this.toastIcon = "bi bi-exclamation-triangle"
        this.toastClass = "bg-danger"
        this.toastMessage = "An error occurred while fetching the employees"
        this.controlShowToast(true)
        this.isLoading = false;
      });
  }

  handleUpdate(row: any) {
    this.router.navigate(['/employees/', row.id]);
  }

  handleDelete(row: any) {
    this.isLoading = true;
    this.userService.destroy(row.id).subscribe(_response => {
      this.toastClass = "bg-success"
      this.toastIcon = "bi bi-cloud-check"
      this.toastMessage = "Employee deleted successfully!"
      this.controlShowToast(true)
      this.loadData()
    }, _error => {
      this.toastClass = "bg-danger"
      this.toastMessage = "An error occurred while deleting the employee"
      this.toastIcon = "bi bi-exclamation-triangle"
      this.controlShowToast(true)
      this.isLoading = false;
    });
  }

  controlShowToast(value: boolean) {
    if (value) {
      this.showToast = value
      setTimeout(() => { this.showToast = !value }, 3000)
      return
    }
    this.showToast = value;
  }

  handleOptionSelected(option: { label: string, value: string }) {
    this.queryField = option.value
  }

}
