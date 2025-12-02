import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInActivityModalComponent } from './session-in-activity-modal.component';

describe('SessionInActivityModalComponent', () => {
  let component: SessionInActivityModalComponent;
  let fixture: ComponentFixture<SessionInActivityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionInActivityModalComponent]
    });
    fixture = TestBed.createComponent(SessionInActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
