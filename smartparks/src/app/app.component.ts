import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserIdleService } from 'angular-user-idle';
import { SessionInActivityModalComponent } from './shared/dialogs/session-in-activity-modal/session-in-activity-modal.component';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'smart-parks';
  isModalOpen: boolean = false;
  timeOut: number = 10;

  constructor(private userIdle: UserIdleService,
    private dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userIdle.startWatching();

    this.userIdle.onTimerStart().subscribe(count => this.checkSessionInActivity(count));

  }

  checkSessionInActivity(timer: number) {
    if (!this.isModalOpen && timer >= 1) {
      this.isModalOpen = true;
      this.openInActivityPopup(timer);
    }
  }

  openInActivityPopup(timer: number) {
    const dialogRef = this.dialog.open(SessionInActivityModalComponent, {
      disableClose: true,
      width: '350px',
      height: '200px',
      maxHeight: '200px',
      position: {
        top: '60px'
      },
      data: {
        timeOut: this.timeOut
      },
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.event == 'No') {
        this.userIdle.resetTimer();
      } else {
        this.userIdle.resetTimer();
        this.userIdle.stopTimer();
        this.userIdle.stopWatching();
        this.authService.logout();
      }
      this.isModalOpen = false;
    })
  }

}
