import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Picture } from '../shared/picture';
import { PictureService } from '../services/picture.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {

  pictures: Picture[];
  errMess: string;

  selectedPic: Picture;

  constructor(private pictureService: PictureService,
    private router: Router,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        document.body.scrollTop = 0;
    });

    this.pictureService.getPictures()
      .subscribe(pictures => this.pictures = pictures,
        errmess => this.errMess = <any>errmess);
  }

  onSelect(picture: Picture) {
    this.selectedPic = picture;
  }

}
