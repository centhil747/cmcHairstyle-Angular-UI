import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturedetailComponent } from './picturedetail.component';

describe('picturedetailComponent', () => {
  let component: PicturedetailComponent;
  let fixture: ComponentFixture<PicturedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
