import { Injectable } from '@angular/core';
import {
	Plugins,
	PushNotification,
	PushNotificationToken,
	PushNotificationActionPerformed,
	Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';
import { Servidor } from './server';

const { PushNotifications } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class FcmService
{
	constructor(
		private router: Router,
		public server: Servidor
	) { }

	initPush()
	{
		if(Capacitor.platform !== 'web')
			this.registerPush();
	}

	private registerPush()
	{
		let record = (user, notify)=>
		{
			let enc = (p) => encodeURIComponent(p),
				url = `?act=save&timestamp=${enc(new Date())}&user=${enc(user)}&notify=${enc(notify)}`;
			this.server.envia_get(url).subscribe((data:any)=>
			{
				console.log('saved');
			},(err)=> console.log(err))
		};
		PushNotifications.requestPermission().then((permission) => {
			if(permission.granted)
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			
			else { /*No permission for push granted*/ }
		});

		PushNotifications.addListener(
			'registration',
			(token: PushNotificationToken) => {
				console.log('My token: ' + JSON.stringify(token.value));
				localStorage.setItem('token', token.value)
			}
		);

		PushNotifications.addListener('registrationError', (error: any) => {
			console.log('Error: ' + JSON.stringify(error));
		});

		PushNotifications.addListener(
			'pushNotificationReceived',
			async (notification: PushNotification) => {
				console.log('Push received: ', (notification));
				alert(notification.title+"\n"+notification.body);
				record(localStorage.getItem('token'), notification.id);
			}
		);

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			async ({notification}: PushNotificationActionPerformed) => {
				console.log('Push action performed: ', (notification));
				record(localStorage.getItem('token'), notification['id']);
			}
		);
	}
}