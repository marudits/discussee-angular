import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: '../pages/thread/thread.module#ThreadModule' }
];
     
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}