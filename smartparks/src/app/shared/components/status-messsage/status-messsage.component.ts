import { Component, EventEmitter, Input, Output } from '@angular/core';

export const AlertStatus = {
  success: 'Success',
  info: 'Info',
  error: 'Error'
}

@Component({
  selector: 'app-status-messsage',
  templateUrl: './status-messsage.component.html',
  styleUrls: ['./status-messsage.component.scss']
})
export class StatusMesssageComponent {

  @Input() visible: boolean = false;
  @Input() alertType!: string;
  @Input() message!: string;
  @Output() onCloseDialog = new EventEmitter<boolean>();

  closeDialog(status: boolean) {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }

}
