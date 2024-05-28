import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  status: "Active" | "Inactive" = "Active"
  picture: string = null
  selectedFile: any = null;
  errors: { [key: string]: Array<string> } = {}
  user_id: string = ""
  showToast: boolean = false;
  isLoading: boolean = false;
  toastMessage: string = "Employee stored successfully!"
  toastClass: string = "bg-success"
  toastIcon: string = "bi bi-cloud-check"

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.isLoading = true;
        this.userService.find(params.id).subscribe(response => {
          const data = response["data"];
          this.name = data.name;
          this.last_name = data.last_name;
          this.company = data.company;
          this.area = data.area;
          this.department = data.department;
          this.job_title = data.job_title;
          this.picture = data.picture_url;
          this.status = data.status;
          this.submitType = "update";
          this.user_id = params.id;
          this.isLoading = false;
        }, _error => {
          this.toastIcon = "bi bi-exclamation-triangle"
          this.toastClass = "bg-danger"
          this.toastMessage = "An error occurred while fetching the employee"
          this.controlShowToast(true)
          this.isLoading = false;
        });
      }
    });
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    const data: FormData = new FormData();
    data.append('name', this.name);
    data.append('last_name', this.last_name);
    data.append('company', this.company);
    data.append('area', this.area);
    data.append('department', this.department);
    data.append('job_title', this.job_title);
    data.append('status', this.status);
    if(this.selectedFile != null) data.append('picture', this.selectedFile);

    if (this.submitType === "store") {
      this.userService.store(data).subscribe(_response => {
        //Prepare toast
        this.toastClass = "bg-success"
        this.toastIcon = "bi bi-cloud-check"
        this.toastMessage = "Employee stored successfully!"

        //Reset values
        this.name = ""
        this.last_name = ""
        this.company = ""
        this.area = ""
        this.department = ""
        this.job_title = ""
        this.picture = null
        this.selectedFile = null
        this.status = "Active"

        //show toast
        this.controlShowToast(true)
        this.isLoading = false;
      }, error => {
        if (error.status === 422) {
          this.errors = error.error.errors
        } else {
          this.toastIcon = "bi bi-exclamation-triangle"
          this.toastClass = "bg-danger"
          this.toastMessage = "An error occurred while storing the employee"
          this.controlShowToast(true)
        }
        this.isLoading = false;
      });
      return
    }

    this.userService.update(this.user_id, data).subscribe(response => {
      this.toastClass = "bg-success"
      this.toastIcon = "bi bi-cloud-check"
      this.toastMessage = "Employee updated successfully!"
      this.picture = response["data"].picture_url;
      this.controlShowToast(true)
      this.isLoading = false;
    }, error => {
      if (error.status === 422) {
        this.errors = error.error.errors
      } else {
        this.toastIcon = "bi bi-exclamation-triangle"
        this.toastClass = "bg-danger"
        this.toastMessage = "An error occurred while updating the employee"
        this.controlShowToast(true)
      }
      this.isLoading = false;
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

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
        this.picture = reader.result as string;
    };
  }

  onStatusChange(event: any) {
    this.status = event.target.checked ? 'Active' : 'Inactive';
  }

}
