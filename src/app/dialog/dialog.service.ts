import {
  Injectable, ComponentFactoryResolver, Injector, ComponentFactory, ApplicationRef, ViewRef,
  ComponentRef, TemplateRef, ReflectiveInjector
} from "@angular/core";
import {AppDialogRef} from "./dialog.ref";
import {AppDialogComponent} from "./dialog.component";
import {AppDialogBdComponent} from "./dialog-backdrop";
import {AppDialogOptions} from "./dialog-options.model";
import {AppDialogOptionsProvider} from "./dialog-options-provider";
import {mergeOptions} from "./utils";


export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {
  }
}

@Injectable()
export class AppDialogService {

  private options:AppDialogOptions;
  private AppDialogFactory: ComponentFactory<AppDialogComponent>;
  private AppDialogBdFactory: ComponentFactory<AppDialogBdComponent>;

  constructor(private _moduleCFR: ComponentFactoryResolver, private _injector: Injector, private appRef: ApplicationRef, private optionsProvider: AppDialogOptionsProvider) {
    this.options = this.optionsProvider.options;
    this.AppDialogFactory = this._moduleCFR.resolveComponentFactory(AppDialogComponent);
    this.AppDialogBdFactory = this._moduleCFR.resolveComponentFactory(AppDialogBdComponent);
  }

  open(options: AppDialogOptions = {},content: any ): AppDialogRef {
    return this.create(this._moduleCFR, this._injector, content, options);
  }

  confirm(options: AppDialogOptions = {}): AppDialogRef {
    options.type = 'confirm';
    return this.create(this._moduleCFR, this._injector, null, options);
  }

  alert(options: AppDialogOptions = {}): AppDialogRef {
    options.type = 'alert';
    return this.create(this._moduleCFR, this._injector, null, options);
  }

  prompt(options: AppDialogOptions = {}): AppDialogRef {
    options.type = 'prompt';
    return this.create(this._moduleCFR, this._injector, null, options);
  }

  create(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): AppDialogRef {
    const containerEl = document.querySelector('body');

    if (!options.type && !content) {
      throw new Error(`content or options type must exist`);
    }

    const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content);

    let appDialogCptRef: ComponentRef<AppDialogComponent>;
    let AppDialogBdCptRef: ComponentRef<AppDialogBdComponent>;
    let appDialogRef: AppDialogRef;

    AppDialogBdCptRef = this.AppDialogBdFactory.create(this._injector);
    this.appRef.attachView(AppDialogBdCptRef.hostView);
    containerEl.appendChild(AppDialogBdCptRef.location.nativeElement);

    appDialogCptRef = this.AppDialogFactory.create(this._injector, contentRef.nodes);
    this.appRef.attachView(appDialogCptRef.hostView);
    containerEl.appendChild(appDialogCptRef.location.nativeElement);
    options=mergeOptions(this.options, options);
    appDialogRef = new AppDialogRef(appDialogCptRef, AppDialogBdCptRef, contentRef, options);

    return appDialogRef;
  }

  private _getContentRef(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(content);
      this.appRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    } else {
      const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
      const modalContentInjector =
        ReflectiveInjector.resolveAndCreate([], contentInjector);
      const componentRef = contentCmptFactory.create(modalContentInjector);
      this.appRef.attachView(componentRef.hostView);
      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
  }
}

