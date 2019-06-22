import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { LoginComponent } from '../login/login.component';
import { Picture } from '../shared/picture';
import { Comment } from '../shared/comment';

import { AuthService } from '../services/auth.service';
import { PictureService } from '../services/picture.service';
import { FavoriteService } from '../services/favorite.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-picturedetail',
  templateUrl: './picturedetail.component.html',
  styleUrls: ['./picturedetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class PicturedetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;
  picture: Picture;
  picturecopy: Picture;
  pictureIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite = false;

  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private pictureService: PictureService,
    private auth: AuthService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.createForm();

    this.pictureService.getPictureIds().subscribe(pictureIds => this.pictureIds = pictureIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.pictureService.getPicture(params['id']); }))
    .subscribe(picture => {
      this.picture = picture;
      this.setPrevNext(picture._id);
      this.visibility = 'shown'; 
      this.favoriteService.isFavorite(this.picture._id)
      .subscribe(resp => { console.log(resp); this.favorite = <boolean>resp.exists; },
          err => console.log(err));
    },
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(pictureId: string) {
    const index = this.pictureIds.indexOf(pictureId);
    this.prev = this.pictureIds[(this.pictureIds.length + index - 1) % this.pictureIds.length];
    this.next = this.pictureIds[(this.pictureIds.length + index + 1) % this.pictureIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  isObjectEmpty = function(card){
    return Object.keys(card).length === 0;
  }

  onSubmit() {
    if (!this.auth.isAuthenticated) {
        this.openLoginForm();
    } else {
      this.pictureService.postComment(this.picture._id, this.commentForm.value)
        .subscribe(picture => this.picture = <Picture>picture);
      this.commentFormDirective.resetForm();
      this.commentForm.reset({
        rating: 5,
        comment: ''
      });
    }
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
  }

  addToFavorites() {
    if (!this.favorite) {
      if (!this.auth.isAuthenticated) {
        this.openLoginForm();
      } else {
        this.favoriteService.postFavorite(this.picture._id)
          .subscribe(favorites => { console.log(favorites); this.favorite = true; });
      }
    }
  }
}
