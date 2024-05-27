import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message = '';
  @Input() icon = '';
  @Input() delay = 2000;
  @Output() onHide = new EventEmitter<void>();
  toast: any;
  @Input() customClass: string = "";

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.toast = new Toast(this.el.nativeElement.querySelector('.toast'), { delay: this.delay });
    this.toast.show();
  }

  ngOnDestroy() {
    this.toast.dispose();
  }

  closeToast() {
    this.toast.dispose();
  }
}