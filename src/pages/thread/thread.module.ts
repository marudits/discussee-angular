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
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
  	ThreadComponent,
  	ThreadDetailComponent,
  	ThreadFormComponent,
  	ThreadItemComponent
  ],
  providers: [],
  exports: [RouterModule]
})

export class ThreadModule {
	static routes = routes
}
