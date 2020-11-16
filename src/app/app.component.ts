import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

import { FcmService } from './providers/fcm.service';
import { Servidor } from './providers/server';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent
{
	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		public server: Servidor,
        private router: Router,
		private fcmService: FcmService
	)
	{
		this.initializeApp();
	}
	initializeApp()
	{
		this.platform.ready().then(() => {
			// get event data
			let url = '?act=isAvaliation',
				iosAvaliation;
			this.server.envia_get(url).subscribe( (data:any) => {
				iosAvaliation = data;
				if(Capacitor.platform !== 'web')
				// if(true)
					// if(true)
					if(Capacitor.platform == 'ios' && !!iosAvaliation)
						this.router.navigateByUrl("/login-fake");
					
					else
					{
						this.statusBar.styleDefault();
						this.fcmService.initPush();
					}
			}, (err) => console.log(err) );
		});
	}
}