import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<void>();
  @Input() class: string = "";

  constructor() { }

  ngOnInit() {
    this.formSubmit.emit();
  }

}
