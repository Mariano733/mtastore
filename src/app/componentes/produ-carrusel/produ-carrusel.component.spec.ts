import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduCarruselComponent } from './produ-carrusel.component';

describe('ProduCarruselComponent', () => {
  let component: ProduCarruselComponent;
  let fixture: ComponentFixture<ProduCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduCarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
