import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMesssageComponent } from './status-messsage.component';

describe('StatusMesssageComponent', () => {
  let component: StatusMesssageComponent;
  let fixture: ComponentFixture<StatusMesssageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusMesssageComponent]
    });
    fixture = TestBed.createComponent(StatusMesssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
