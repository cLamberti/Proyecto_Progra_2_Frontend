import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPhonesComponent } from './client-phones.component';

describe('ClientPhonesComponent', () => {
  let component: ClientPhonesComponent;
  let fixture: ComponentFixture<ClientPhonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPhonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
