import {Injectable, Inject, InjectionToken} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {AppDialogOptions} from "./dialog-options.model";
import {mergeOptions} from "./utils";

export const DIALOG_OPTIONS = new InjectionToken<AppDialogOptions>('DIALOG_OPTIONS');

/** @private */
@Injectable()
export class AppDialogOptionsProvider {

  private defaultOptions: AppDialogOptions;
  private _options: AppDialogOptions;

  constructor(@Inject(DIALOG_OPTIONS) options: AppDialogOptions = {}, private title: Title) {
    this.defaultOptions = {
      backdrop: true,
      backdropClass: 'dialog-mask mask-in',
      title: this.title.getTitle() || '',
      content: '',
      cancelText: '确定',
      confirmText: '取消',
    };
    this._options = mergeOptions(this.defaultOptions, options);

  }

  get options(): AppDialogOptions {
    return this._options;
  }
}
