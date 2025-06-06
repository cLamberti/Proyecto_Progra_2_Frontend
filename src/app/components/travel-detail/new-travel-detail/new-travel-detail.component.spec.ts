import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelDetailComponent } from './new-travel-detail.component';

describe('NewTravelDetailComponent', () => {
  let component: NewTravelDetailComponent;
  let fixture: ComponentFixture<NewTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTravelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
