import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ { path: 'dishdetail/:id',     component: DishdetailComponent },
{ path: 'menu',component: MenuComponent },{path:"aboutus",component:AboutComponent},
{path:"contact",component:ContactComponent},{path:"home",component:HomeComponent},
{path:"dishdetail/:id",component:DishdetailComponent},
{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
