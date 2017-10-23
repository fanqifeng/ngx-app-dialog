/**
 * Created by fanqifeng on 17-10-23.
 */

import {AppDialogOptions} from "./dialog-options.model";

export function mergeOptions(oldOptions: AppDialogOptions, newOptions?: AppDialogOptions): AppDialogOptions {
  if (!newOptions) {
    return oldOptions;
  }

  return {
    backdrop: isPresent(newOptions.backdrop) ? newOptions.backdrop : oldOptions.backdrop,
    backdropClass: isPresent(newOptions.backdropClass) ? newOptions.backdropClass : oldOptions.backdropClass,
    title: isPresent(newOptions.title) ? newOptions.title : oldOptions.title,
    content: isPresent(newOptions.content) ? newOptions.content : oldOptions.content,
    cancelText: isPresent(newOptions.cancelText) ? newOptions.cancelText : oldOptions.cancelText,
    confirmText: isPresent(newOptions.confirmText) ? newOptions.confirmText : oldOptions.confirmText,
  };
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}
