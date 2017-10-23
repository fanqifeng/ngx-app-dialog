import {NgModule, ModuleWithProviders, ComponentFactoryResolver, ApplicationRef, Injector} from "@angular/core";
import {AppDialogComponent} from "./dialog.component";
import {AppDialogService} from "./dialog.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AppDialogBdComponent} from "./dialog-backdrop";
import {DIALOG_OPTIONS, AppDialogOptionsProvider} from "./dialog-options-provider";
import {AppDialogOptions} from "./dialog-options.model";


export function appDialogServiceFactory(appDialogOptionsProvider: AppDialogOptionsProvider, _moduleCFR: ComponentFactoryResolver,
                                        _injector: Injector, appRef: ApplicationRef): AppDialogService {

  return new AppDialogService(_moduleCFR, _injector, appRef, appDialogOptionsProvider);
}


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [AppDialogComponent, AppDialogBdComponent],
  entryComponents: [AppDialogComponent, AppDialogBdComponent],
  providers: [AppDialogService, AppDialogOptionsProvider]
})

export class AppDialogModule {

  static forRoot(options: AppDialogOptions = {}): ModuleWithProviders {
    return {
      ngModule: AppDialogModule,
      providers: [
        {provide: DIALOG_OPTIONS, useValue: options},
        {
          provide: AppDialogService,
          useFactory: appDialogServiceFactory,
          deps: [ComponentFactoryResolver, Injector, ApplicationRef, AppDialogOptionsProvider]
        }
      ]
    };
  }

  static forChild(options: AppDialogOptions = {}): ModuleWithProviders {
    return {
      ngModule: AppDialogModule,
      providers: [
        {provide: DIALOG_OPTIONS, useValue: options},
        {
          provide: AppDialogService,
          useFactory: appDialogServiceFactory,
          deps: [ComponentFactoryResolver, Injector, ApplicationRef, AppDialogOptionsProvider]
        }
      ]
    };
  }
}
