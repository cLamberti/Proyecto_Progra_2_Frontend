import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProviderComponent } from './delete-provider.component';

describe('DeleteProviderComponent', () => {
  let component: DeleteProviderComponent;
  let fixture: ComponentFixture<DeleteProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
