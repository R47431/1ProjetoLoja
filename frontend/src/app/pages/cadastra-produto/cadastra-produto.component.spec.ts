import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraProdutoComponent } from './cadastra-produto.component';

describe('CadastraProdutoComponent', () => {
  let component: CadastraProdutoComponent;
  let fixture: ComponentFixture<CadastraProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastraProdutoComponent]
    });
    fixture = TestBed.createComponent(CadastraProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
