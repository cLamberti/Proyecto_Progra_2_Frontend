import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTravelDetailsComponent } from './list-travel-details.component';

describe('ListTravelDetailsComponent', () => {
  let component: ListTravelDetailsComponent;
  let fixture: ComponentFixture<ListTravelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTravelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTravelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
