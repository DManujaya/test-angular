import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideojsWavesurferComponent } from './videojs-wavesurfer.component';

describe('VideojsWavesurferComponent', () => {
  let component: VideojsWavesurferComponent;
  let fixture: ComponentFixture<VideojsWavesurferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideojsWavesurferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideojsWavesurferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
