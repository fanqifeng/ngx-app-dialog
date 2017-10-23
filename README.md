# ngx-app-dialog

> 在app应用中仿原生的Dialog方法

## 目录:
- [首先](#get-started)
  - [用法](#usage)
- [AppDialogService](#appDialogservice)
  - [alert()、confirm()、prompt()](#dialog)
  - [open()](#open)
  - [AppDialogRef](#AppDialogRef)
- [对象](#Options)

## <a name="get-started"></a> 首先

### <a name="usage"></a> 用法

`AppDialogModule`应该在`AppModule`中使用`forRoot（）`static方法注册，在子模块中使用`forChild（）`方法注册，
该方法接受一个可选参数`AppDialogOptions`


```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppDialogModule } from 'ngx-cookie';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, AppDialogModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

```typescript
import { Component } from '@angular/core';
import { AppDialogService } from '*/AppDialogService';

@Component({
    selector: 'app-dialog',
    template: `<h1>My Angular App with Dialog</h1>
    <button (click)='appConfirm()'>confirm</button>` 
})

export class AppComponent { 
  constructor(private appDialogService:AppDialogService){}
  
  appConfirm(){
    this.appDialogService.confirm({title:'confirm',content:'我的确认框'})
      .result.then(confirm=>{},cancel=>{})
  }
}
```

## <a name="appDialogservice"></a> AppDialogService

### <a name="dialog"></a> alert()、confirm()、prompt()
返回一个弹出框实例，alert的AppDialogOptions接受的对象不需要cancelText

```typescript
/**
 * @param {AppDialogOptions} .
 * @returns {AppDialogRef} 弹出框实例.
 */
alert(appDialogOptions: AppDialogOptions);
confirm(appDialogOptions: AppDialogOptions);
prompt(appDialogOptions: AppDialogOptions);
```

### <a name="open"></a> open()
返回一个弹出框实例，alert()、confirm()、prompt()方法都是open()的其中一种，
方法都是open的AppDialogOptions接受的对象中可接受type属性来指明dialog是alert或者confirm或者prompt
open方法还可接受content对象，该对象是自定义弹出框内容

```typescript
/**
 * @param content 自定义弹出框内容
 * @param {AppDialogOptions} .
 * @returns {AppDialogRef} 弹出框实例.
 */
open(appDialogOptions: AppDialogOptions,content);
```

### <a name="AppDialogRef"></a> AppDialogRef
AppDialogRef对象有close和dismiss两个方法，用来手动关闭dialog,
有一个result的Promise对象，用来显示异最终完成(或失败)及其结果值的表示,

```typescript
this.AppDialogRef=open(appDialogOptions: AppDialogOptions,content);
this.AppDialogRef.close('close');
this.AppDialogRef.dismiss('dismiss');

this.AppDialogRef.result.then(res=>{
  console.log(res)        //输出close
},error=>{
  console.log(error)      //输出dismiss
})
```

## <a name="options"></a> 对象

Options 对象是一个 `AppDialogOptions` 接口. 该对象有下列几个属性:

- **type**: - {string} - dialog的类型，alert、confirm、prompt;
- **backdrop**: - {any} - 是否可通过点击背景取消dialog;
- **backdropClass**: - {string} - dialog的背景class类;
- **title**: - {string} - dialog的标题，默认是页面标题;
- **content**: - {string} - dialog的提示内容;
- **cancelText**: - {string} - dialog的取消按钮文本，默认为取消;
- **confirmText**: - {string} - dialog的确定按钮文本，默认为确定;
