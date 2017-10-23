import {ComponentRef} from '@angular/core';
import {ContentRef} from "./dialog.service";
import {AppDialogComponent} from "./dialog.component";
import {AppDialogBdComponent} from "./dialog-backdrop";
import {AppDialogOptions} from "./dialog-options.model";

/**
 * A reference to a newly opened modal.
 */
export class AppDialogRef {
  private _resolve: (result?: any) => void;
  private _reject: (reason?: any) => void;

  /**
   * The instance of component used as modal's content.
   * Undefined when a TemplateRef is used as modal's content.
   */
  get componentInstance(): any {
    if (this._contentRef.componentRef) {
      return this._contentRef.componentRef.instance;
    }
  }

  // only needed to keep TS1.8 compatibility
  set componentInstance(instance: any) {
  }

  /**
   * A promise that is resolved when a modal is closed and rejected when a modal is dismissed.
   */
  result: Promise<any>;

  constructor(private AppDialogCptRef: ComponentRef<AppDialogComponent>, private AppDialogBdCptRef: ComponentRef<AppDialogBdComponent>, private _contentRef: ContentRef, private options: AppDialogOptions) {

    AppDialogCptRef.instance.type = options.type;
    AppDialogCptRef.instance.title = options.title;
    AppDialogCptRef.instance.content = options.content;
    AppDialogCptRef.instance.cancelText = options.cancelText;
    AppDialogCptRef.instance.confirmText = options.confirmText;
    AppDialogCptRef.instance.btnConfirm.subscribe((reason: any) => {
      this.close(reason);
    });
    AppDialogCptRef.instance.btnCancel.subscribe((reason: any) => {
      this.dismiss(reason);
    });
    AppDialogBdCptRef.instance.backdropClass = options.backdropClass;
    if (options.backdrop) {
      AppDialogBdCptRef.instance.closeBackDrop.subscribe((reason: any) => {
        this.dismiss(reason);
      });
    }
    this.result = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this.result.then(null, () => {
    });
  }

  /**
   * Can be used to close a modal, passing an optional result.
   */
  close(result?: any): void {
    if (this.AppDialogCptRef) {
      this._resolve(result);
      this._removeModalElements();
    }
  }

  /**
   * Can be used to dismiss a modal, passing an optional reason.
   */
  dismiss(reason?: any): void {
    if (this.AppDialogCptRef) {
      this._reject(reason);
      this._removeModalElements();
    }
  }

  private _removeModalElements() {

    const backdropNativeEl = this.AppDialogBdCptRef.location.nativeElement;
    backdropNativeEl.parentNode.removeChild(backdropNativeEl);
    this.AppDialogBdCptRef.destroy();

    const windowNativeEl = this.AppDialogCptRef.location.nativeElement;
    windowNativeEl.parentNode.removeChild(windowNativeEl);
    this.AppDialogCptRef.destroy();

    if (this._contentRef && this._contentRef.viewRef) {
      this._contentRef.viewRef.destroy();
    }

    this.AppDialogCptRef = null;
    this._contentRef = null;
  }
}
