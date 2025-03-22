import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminarMuestrasComponent } from './examinar-muestras.component';

describe('ExaminarMuestrasComponent', () => {
  let component: ExaminarMuestrasComponent;
  let fixture: ComponentFixture<ExaminarMuestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminarMuestrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminarMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
