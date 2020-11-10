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

import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();

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
		let record_notify = (notify)=>
		{
			let enc = (p) => encodeURIComponent(p),
				url = `?act=save&timestamp=${enc( new Date().getTime() )}&notify=${enc(notify)}`;
			this.server.envia_get(url).subscribe((data:any)=>
			{
				console.log('saved');
			},(err)=> console.log(err))
		};
		PushNotifications.requestPermission().then((permission) => {
			if(permission.granted)
			{
				console.log('registering')
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register().then(() => {
					fcm
					  .subscribeTo({ topic: 'all-content' })
					  .then((r) => console.log(`subscribed to topic`))
					  .catch((err) => console.log('subscribed', err));
				}).catch((err) => alert(JSON.stringify(err)));;
			}
			else { /*No permission for push granted*/ }
		});

		PushNotifications.addListener(
			'registration',
			(token: PushNotificationToken) => {
				let record_token = (token)=>
				{
					let enc = (p) => encodeURIComponent(p),
						url = `?act=token&token=${enc(token)}`;
					this.server.envia_get(url).subscribe((data:any)=>
					{
						console.log('saved');
					},(err)=> console.log(err))
				};

				console.log('My token: ' + JSON.stringify(token.value));

				record_token(token.value)
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
				record_notify(notification['data']['id']);
			}
		);

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			async ({notification}: PushNotificationActionPerformed) => {
				console.log('Push action performed: ', (notification));
				record_notify(notification['data']['id']);
			}
		);
	}
}