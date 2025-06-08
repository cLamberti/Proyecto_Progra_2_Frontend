import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProveedoresComponent } from './ad-proveedores.component';

describe('AdProveedoresComponent', () => {
  let component: AdProveedoresComponent;
  let fixture: ComponentFixture<AdProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
