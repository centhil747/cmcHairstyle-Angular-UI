import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MenuComponent } from '../menu/menu.component';
import { PicturedetailComponent } from '../picturedetail/picturedetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SoloPictureComponent } from '../solo-picture/solo-picture.component';
import { GroupPictureComponent } from '../group-picture/group-picture.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'aboutme', component: AboutComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'favorites',     component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'solo', component: SoloPictureComponent },
  { path: 'group', component: GroupPictureComponent },
  { path: 'dishdetail/:id',     component: PicturedetailComponent }

];
