import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {
  @Input() title: string = "No data to display"
  @Input() icon: string = "bi bi-people-fill"
  @Input() message: string = ""
  @Input() customClass: string = ""

  constructor() { }

  ngOnInit() {
  }

}
