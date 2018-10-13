import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPictureComponent } from './group-picture.component';

describe('GroupPictureComponent', () => {
  let component: GroupPictureComponent;
  let fixture: ComponentFixture<GroupPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
