import { Component } from '@angular/core';
import { Servidor } from '../providers/server';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss'],
})
export class TabsPage
{
	constructor(
		public servidor: Servidor,
		private router: Router
	) { }

	sigin()
	{

	}
}