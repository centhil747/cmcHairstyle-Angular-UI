import { Component, OnInit, Inject } from '@angular/core';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { flyInOut , expand} from '../animations/app.animation';

@Component({
  selector: 'app-group-picture',
  templateUrl: './group-picture.component.html',
  styleUrls: ['./group-picture.component.scss'],
  providers: [ PictureService ],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class GroupPictureComponent implements OnInit {
  pictures: Picture[];
  selectedPicture: Picture;
  errMess: string;

  constructor(private pictureService: PictureService,
  @Inject('baseURL') private BaseURL) { }

  ngOnInit() {
      this.pictureService.getGroupPictures()
      .subscribe(pictures => this.pictures =  pictures,
        errmess => this.errMess = <any>errmess);

  }

  // Will be used while displaying a specific picture
  onSelect(picture: Picture) {
    this.selectedPicture = picture;
  }

}
