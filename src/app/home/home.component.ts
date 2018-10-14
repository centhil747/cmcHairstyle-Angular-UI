import { Component, OnInit, Inject } from '@angular/core';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { Family } from '../shared/family';
import { FamilyService } from '../services/family.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  soloPic: Picture;
  groupPic: Picture;
  family: Family;
  soloPicErrMess: string;
  groupPicErrMess: string;
  familyErrMess: string;

  constructor(private pictureservice: PictureService,
    private familyservice: FamilyService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.pictureservice.getFeaturedSoloPicture()
      .subscribe(picture => this.soloPic = picture,
        errmess => this.soloPicErrMess = <any>errmess);
    this.pictureservice.getFeaturedGroupPicture()
      .subscribe(picture => this.groupPic = picture,
        errmess => this.groupPicErrMess = <any>errmess);
    this.familyservice.getFeaturedFamily()
      .subscribe(family => this.family = family,
        errmess => this.familyErrMess = <any>errmess);
  }

}
