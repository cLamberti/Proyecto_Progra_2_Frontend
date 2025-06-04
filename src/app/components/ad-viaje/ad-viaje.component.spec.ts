import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdViajeComponent } from './ad-viaje.component';

describe('AdViajeComponent', () => {
  let component: AdViajeComponent;
  let fixture: ComponentFixture<AdViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdViajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
