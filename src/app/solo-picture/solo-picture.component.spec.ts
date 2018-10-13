import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloPictureComponent } from './solo-picture.component';

describe('SoloPictureComponent', () => {
  let component: SoloPictureComponent;
  let fixture: ComponentFixture<SoloPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
