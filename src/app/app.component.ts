import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';

// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
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
		// private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public server: Servidor,
		private fcmService: FcmService
	)
	{
		this.initializeApp();
	}
	initializeApp()
	{
		this.platform.ready().then(() => {
			if(Capacitor.platform !== 'web')
			{
				this.statusBar.styleDefault();
				this.fcmService.initPush();
				// this.splashScreen.hide();
			}
		});
	}
}