import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTravelDetailComponent } from './search-travel-detail.component';

describe('SearchTravelDetailComponent', () => {
  let component: SearchTravelDetailComponent;
  let fixture: ComponentFixture<SearchTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTravelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
