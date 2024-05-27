import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  submitType: "update" | "store" = "store"
  name: string = ""
  last_name: string = ""
  company: string = ""
  area: string = ""
  department: string = ""
  job_title: string = ""
  errors: { [key: string]: Array<string> } = {}
  user_id: string = ""
  showToast: boolean = false;
  isLoading: boolean = false;
  toastMessage: string = "Employee stored successfully!"
  toastClass: string = "bg-success"
  toastIcon: string = "bi bi-cloud-check"

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.userService.find(params.id).subscribe(response => {
          const data = response["data"];
          this.name = data.name;
          this.last_name = data.last_name;
          this.company = data.company;
          this.area = data.area;
          this.department = data.department;
          this.job_title = data.job_title;
          this.submitType = "update";
          this.user_id = params.id;
        }, _error => {
          this.toastIcon = "bi bi-exclamation-triangle"
          this.toastClass = "bg-danger"
          this.toastMessage = "An error occurred while fetching the employee"
          this.controlShowToast(true)
        });
      }
    });
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    this.controlShowToast(true)
    const data = {
      name: this.name,
      last_name: this.last_name,
      company: this.company,
      area: this.area,
      department: this.department,
      job_title: this.job_title
    }

    if (this.submitType === "store") {
      this.userService.store(data).subscribe(_response => {
        this.toastClass = "bg-success"
        this.toastIcon = "bi bi-cloud-check"
        this.toastMessage = "Employee stored successfully!"
        this.controlShowToast(true)
        setTimeout(() => { this.showToast = false }, 3000)
        this.name = ""
        this.last_name = ""
        this.company = ""
        this.area = ""
        this.department = ""
        this.job_title = ""
      }, error => {
        if (error.status === 422) {
          this.errors = error.error.errors
        } else {
          this.toastIcon = "bi bi-exclamation-triangle"
          this.toastClass = "bg-danger"
          this.toastMessage = "An error occurred while storing the employee"
          this.controlShowToast(true)
        }
      });
      return
    }

    this.userService.update(this.user_id, data).subscribe(_response => {
      this.toastClass = "bg-success"
      this.toastIcon = "bi bi-cloud-check"
      this.toastMessage = "Employee updated successfully!"
      this.controlShowToast(true)
    }, error => {
      if (error.status === 422) {
        this.errors = error.error.errors
      } else {
        this.toastIcon = "bi bi-exclamation-triangle"
        this.toastClass = "bg-danger"
        this.toastMessage = "An error occurred while updating the employee"
        this.controlShowToast(true)
      }
    });
  }

  controlShowToast(value: boolean) {
    if(value) {
      this.showToast = value
      setTimeout(() => { this.showToast = !value }, 3000)
      return
    }
    this.showToast = value;
  }

}
