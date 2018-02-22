import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//components
import { ThreadDetailComponent } from '../../components/thread-detail/thread-detail.component';
import { ThreadFormComponent } from '../../components/thread-form/thread-form.component';

//library
import { MaterializeModule } from "angular2-materialize";

//pages
import { ThreadComponent } from './thread.component';

export const routes = [
	{
		path: '',
		component: ThreadComponent,
		pathMatch: 'full'
	},
	{
		path: 'add',
		component: ThreadFormComponent
	},
	{
		path: 'update/:id',
		component: ThreadFormComponent
	},
	{
		path: 'detail/:id',
		component: ThreadDetailComponent
	}
]

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
  	ThreadComponent,
  	ThreadDetailComponent,
  	ThreadFormComponent
  ],
  providers: [],
  exports: [RouterModule]
})

export class ThreadModule {
	static routes = routes
}
