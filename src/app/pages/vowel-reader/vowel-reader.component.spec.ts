import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VowelReaderComponent } from './vowel-reader.component';

describe('VowelReaderComponent', () => {
  let component: VowelReaderComponent;
  let fixture: ComponentFixture<VowelReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VowelReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VowelReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
