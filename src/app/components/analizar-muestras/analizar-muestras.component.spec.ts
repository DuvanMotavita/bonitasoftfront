import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizarMuestrasComponent } from './analizar-muestras.component';

describe('AnalizarMuestrasComponent', () => {
  let component: AnalizarMuestrasComponent;
  let fixture: ComponentFixture<AnalizarMuestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalizarMuestrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalizarMuestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
