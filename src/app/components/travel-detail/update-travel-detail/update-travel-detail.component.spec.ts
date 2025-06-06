import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTravelDetailComponent } from './update-travel-detail.component';

describe('UpdateTravelDetailComponent', () => {
  let component: UpdateTravelDetailComponent;
  let fixture: ComponentFixture<UpdateTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTravelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
