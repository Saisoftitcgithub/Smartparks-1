import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-session-in-activity-modal',
  templateUrl: './session-in-activity-modal.component.html',
  styleUrls: ['./session-in-activity-modal.component.scss']
})
export class SessionInActivityModalComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();
  public timer: number = 0;
  public showMessage: boolean = false;

  constructor(public dialogRef: MatDialogRef<SessionInActivityModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.showMessage = true;
    this.timer = this.data.timeOut;
    const source = timer(1, 1000);
    this.subscriptions.add(source.subscribe((val) => this.checkForExpiry()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  checkForExpiry() {
    this.timer = this.timer - 1;
    if (this.timer == 0) {
      this.showMessage = true;
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    }
  }

  closeTimer() {
    this.dialogRef.close({ event: 'No' });
  }

}
