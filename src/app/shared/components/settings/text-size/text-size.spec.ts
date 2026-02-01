import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSizeComponent } from './text-size';

describe('TextSizeComponent', () => {
  let component: TextSizeComponent;
  let fixture: ComponentFixture<TextSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
