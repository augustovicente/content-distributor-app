import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
	Plugins,
	PushNotification,
	PushNotificationToken,
	PushNotificationActionPerformed
} from '@capacitor/core';
import { Servidor } from './providers/server';
const { PushNotifications } = Plugins;
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public server: Servidor
	)
	{
		this.initializeApp();
	}
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.initFirebase();
		});
	}
	initFirebase()
	{
		let record = (user, notify)=>
		{
			let url = 'https://devborghesi-a4bb8.firebaseio.com/opened_notify.json';
			let data = {"timestamp" : + new Date(), "user" : user, "notify":notify};
			this.server.envia_post(data, url).subscribe((data:any)=>
			{
				console.log('saved');
			},(err)=> console.log(err))
		};
		// Request permission to use push notifications
		// iOS will prompt user and return if they granted permission or not
		// Android will just grant without prompting
		PushNotifications.requestPermission().then(result =>
		{
			if(result.granted) 
			{
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			}
			else
			{
				// Show some error
			}
		});
		// On success, we should be able to receive notifications
		PushNotifications.addListener('registration', (token: PushNotificationToken) =>
		{
			console.log('Push registration success, token: ',token.value);
			localStorage.setItem('token', token.value);
		});
		// Some issue with our setup and push will not work
		PushNotifications.addListener('registrationError',(error: any) =>
		{
			console.log('Error on registration: ' + JSON.stringify(error));
		});
		// Show us the notification payload if the app is open on our device
		PushNotifications.addListener('pushNotificationReceived',(notification: PushNotification) => 
		{
			console.log('Push received: ', (notification));
			alert(notification.title+"\n"+notification.body);
			record(localStorage.getItem('token') ,notification.id);
		});
		// Method called when tapping on a notification
		PushNotifications.addListener('pushNotificationActionPerformed', ({notification}: PushNotificationActionPerformed) =>
		{
			console.log('Push action performed: ', (notification));
			record(localStorage.getItem('token') ,notification.id)
		});
	}
}