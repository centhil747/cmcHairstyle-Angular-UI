import { Component, OnInit, Inject } from '@angular/core';
import * as _ from "lodash";
import { Picture } from '../shared/picture';
import { Dish } from '../shared/dish';
import { PictureService } from '../services/picture.service';
import { flyInOut , expand} from '../animations/app.animation';

@Component({
  selector: 'app-solo-picture',
  providers: [ PictureService ],
  templateUrl: './solo-picture.component.html',
  styleUrls: ['./solo-picture.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class SoloPictureComponent implements OnInit {
  pictures: Picture[];
  selectedPicture: Picture;
  errMess: string;

  constructor(private pictureService: PictureService,
  @Inject('baseURL') private BaseURL) { }

  ngOnInit() {
    /*this.pictureService.getSoloPictures()
      .subscribe(pictures => {this.pictures =  _.filter(pictures, {type: "solo"});
      console.log("+++" + this.pictures);},
        errmess => this.errMess = <any>errmess);*/
      this.pictureService.getPictures()
      .subscribe(pictures => this.pictures =  pictures,
        errmess => this.errMess = <any>errmess);

  }

  // Will be used while displaying a specific picture
  onSelect(picture: Picture) {
    this.selectedPicture = picture;
  }

}
