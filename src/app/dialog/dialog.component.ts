import {
    Component, EventEmitter, Input, OnInit, Output, Renderer2, ElementRef,
    OnDestroy
} from "@angular/core";
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class AppDialogComponent implements OnInit,OnDestroy {

    @Input() type: string;
    @Input() title: string;
    @Input() content: string;
    @Input() cancelText: string;
    @Input() confirmText: string;
    @Output() btnCancel = new EventEmitter<any>();
    @Output() btnConfirm = new EventEmitter<any>();

    dialogValue: string='';

    constructor(private _elRef: ElementRef, private _renderer: Renderer2) {

    }

    dismiss(reason): void {
        this.btnCancel.emit(reason);
    }

    close(reason): void {
        this.btnConfirm.emit(this.dialogValue||reason);
    }

    ngOnInit() {
        this._renderer.addClass(document.body, 'dialog-open');
    }


    ngOnDestroy() {
        this._renderer.removeClass(document.body, 'dialog-open');
    }

}
