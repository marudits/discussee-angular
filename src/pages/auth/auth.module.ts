import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//component
import { AuthComponent } from './auth.component';

//library
import { MaterializeModule } from "angular2-materialize";

export const routes = [
	{
		path: '',
		component: AuthComponent,
		pathMatch: 'full'
	}
]

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
   AuthComponent
  ],
  exports: [RouterModule]
})
export class AuthModule {
	static routes = routes;
}
