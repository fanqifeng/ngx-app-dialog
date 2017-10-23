import {
  Component, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges, OnInit,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-dialog-backdrop',
  template: '',
})
export class AppDialogBdComponent implements OnChanges,OnInit {

  @Input() backdropClass: string;
  @Output() closeBackDrop = new EventEmitter();

  @HostBinding('class') _backdropClass: string;

  @HostListener('click') backdropClick() {
    this.closeBackDrop.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backdropClass'].currentValue != changes['backdropClass'].previousValue) {
      this._backdropClass = changes['backdropClass'].currentValue;
    }
  }

  ngOnInit() {
    this._backdropClass = this.backdropClass;
  }
}
