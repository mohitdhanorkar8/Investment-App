import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestementDashboard } from './investement-dashboard';

describe('InvestementDashboard', () => {
  let component: InvestementDashboard;
  let fixture: ComponentFixture<InvestementDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestementDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestementDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
