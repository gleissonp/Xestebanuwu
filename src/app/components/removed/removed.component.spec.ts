import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedComponent } from './removed.component';

describe('RemovedComponent', () => {
  let component: RemovedComponent;
  let fixture: ComponentFixture<RemovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovedComponent]
    });
    fixture = TestBed.createComponent(RemovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
