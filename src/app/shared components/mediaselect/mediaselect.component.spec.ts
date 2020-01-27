import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaselectComponent } from './mediaselect.component';

describe('MediaselectComponent', () => {
  let component: MediaselectComponent;
  let fixture: ComponentFixture<MediaselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
