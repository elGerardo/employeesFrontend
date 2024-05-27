import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() rows: Array<object> = [{}];
  @Input() rowsOrder: Array<string | "actions"> = [];
  @Input() headers: Array<string | "Actions"> = [];
  @Input() actions: Array<object> = [];
}
