import {Component} from '@angular/core';
import {AppDialogService} from "./dialog/dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngxAppDialog';

  constructor(private appDialogService: AppDialogService) {

  }

  ngxConfirm() {
    this.appDialogService.confirm({
      title: 'confirm',
    }).result.then(res=> {
      console.log('确定')
    }, error=> {
      console.log('取消')
    })
  }

  ngxAlert() {
    this.appDialogService.alert({
      title: 'alert',
    }).result.then(res=> {
      console.log('确定')
    }, error=> {
      console.log('取消')
    })
  }

  ngxPrompt() {
    this.appDialogService.prompt({
      title: 'prompt',
    }).result.then(res=> {
      console.log(res)
    }, error=> {
      console.log('取消')
    })
  }

}
