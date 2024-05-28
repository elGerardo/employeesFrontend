import { Component, Input, EventEmitter, Output } from '@angular/core';

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
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  handleAction(action: string, row: any) {
    if (action === 'update') {
      this.update.emit(row);
      return
    }
    if (action === 'delete') {
      this.delete.emit(row);
      return
    }
  }

  formatDate(date: string) {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
