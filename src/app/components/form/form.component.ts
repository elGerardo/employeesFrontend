import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.formSubmit.emit();
  }

}
