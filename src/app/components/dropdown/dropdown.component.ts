import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<{ label: string, value: string }> = [{'label':'Select an Option', 'value': null}];
  @Output() optionSelected = new EventEmitter<any>();
  defaultOption: { label: string, value: string } = this.options[0];

  constructor() { }

  ngOnInit() {
  }


selectOption(option: { label: string, value: string }) {
  this.defaultOption = option;
  this.optionSelected.emit(this.defaultOption);
}

}
