import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaspaceComponent } from './mediaspace.component';

describe('MediaspaceComponent', () => {
  let component: MediaspaceComponent;
  let fixture: ComponentFixture<MediaspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
