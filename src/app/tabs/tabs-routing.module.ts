import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children:
		[
			{
				path: 'home',
				loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
			},
			{
				path: 'profile',
				loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
			},
			{
				path: 'ebook',
				loadChildren: () => import('../ebook/ebook.module').then(m => m.ProfilePageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule { }