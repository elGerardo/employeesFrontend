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
        });
      }
    });
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    const data = {
      name: this.name,
      last_name: this.last_name,
      company: this.company,
      area: this.area,
      department: this.department,
      job_title: this.job_title
    }

    if (this.submitType === "store") {
      this.userService.store(data).subscribe(response => {
        console.log(response);
      }, error => {
        if (error.status === 422) {
          this.errors = error.error.errors
        }
      });
      return
    }

    this.userService.update(this.user_id, data).subscribe(response => {
      console.log(response);
    }, error => {
      if (error.status === 422) {
        this.errors = error.error.errors
      }
    });
  }

}
