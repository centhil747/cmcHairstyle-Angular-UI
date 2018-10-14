import { Component, OnInit, Inject } from '@angular/core';
import { Family } from '../shared/family';
import { FamilyService } from '../services/family.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

  wholeFamily: Family[];
  errMess: string;

  constructor(private familyservice: FamilyService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.familyservice.getFamilyDetails()
      .subscribe(family => this.wholeFamily = family,
        errmess => this.errMess = <any>errmess);
  }

}
