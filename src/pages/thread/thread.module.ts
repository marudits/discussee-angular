import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { ThreadDetailComponent } from '../../components/thread-detail/thread-detail.component';
import { ThreadFormComponent } from '../../components/thread-form/thread-form.component';
import { ThreadItemComponent } from '../../components/thread-item/thread-item.component';

//library
import { MaterializeModule } from "angular2-materialize";

//pages
import { ThreadComponent } from './thread.component';

//utils
import { AuthGuardService } from '../../utils/service/auth-guard.service';

export const routes = [
	{
		path: '',
		component: ThreadComponent,
		pathMatch: 'full',
		canActivate: [AuthGuardService]
	},
	{
		path: 'add',
		component: ThreadFormComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'update/:id',
		component: ThreadFormComponent
	},
	{
		path: 'detail/:id',
		component: ThreadDetailComponent,
		canActivate: [AuthGuardService]
	}
]

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
  	ThreadComponent,
  	ThreadDetailComponent,
  	ThreadFormComponent,
  	ThreadItemComponent
  ],
  providers: [
  	AuthGuardService
  ],
  exports: [RouterModule]
})

export class ThreadModule {
	static routes = routes
}
