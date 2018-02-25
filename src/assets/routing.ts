import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: '../pages/thread/thread.module#ThreadModule' },
	{ path: 'auth', loadChildren: '../pages/auth/auth.module#AuthModule'}
];
     
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}