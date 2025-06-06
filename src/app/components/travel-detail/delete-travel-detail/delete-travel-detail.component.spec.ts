import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTravelDetailComponent } from './delete-travel-detail.component';

describe('DeleteTravelDetailComponent', () => {
  let component: DeleteTravelDetailComponent;
  let fixture: ComponentFixture<DeleteTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTravelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
