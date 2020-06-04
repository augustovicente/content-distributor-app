import { Component } from '@angular/core';
@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{
	constructor() { }
	open_portal()
	{
		window.open("https://portalpief.club.hotmart.com/login",'_system', 'location=yes');
	}
	open_site()
	{
		window.open("https://carolborghesi.kpages.online/planoperfeitopage",'_system', 'location=yes');
	}
}