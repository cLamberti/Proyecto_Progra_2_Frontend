import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserClientComponent } from './register-user-client.component';

describe('RegisterUserClientComponent', () => {
  let component: RegisterUserClientComponent;
  let fixture: ComponentFixture<RegisterUserClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUserClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
