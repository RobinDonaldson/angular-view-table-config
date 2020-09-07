import {Component, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-msg-notification',
  templateUrl: './msg-notification.component.html',
  styleUrls: ['./msg-notification.component.scss']
})
export class MsgNotificationComponent implements OnDestroy {

  public msgTimeOut;

  public message: MsgNotification;
  @Input() set msgNotification(value: MsgNotification) {
    if (value) {
      this.message = value;
      this.msgTimeOut = setTimeout(() => this.message = null, 1500);
    }
  }
  get msgNotification(): MsgNotification {
    return this.message;
  }

  constructor() { }

  ngOnDestroy(): void {
    clearTimeout(this.msgTimeOut);
  }

}

export interface MsgNotification {
  msg: string;
  color: string;
}
