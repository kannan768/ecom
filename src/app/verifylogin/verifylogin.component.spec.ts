import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyloginComponent } from './verifylogin.component';

describe('VerifyloginComponent', () => {
  let component: VerifyloginComponent;
  let fixture: ComponentFixture<VerifyloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
