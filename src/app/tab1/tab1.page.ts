import { Component } from '@angular/core';
import { Servidor } from '../providers/server';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	img_profile = "../../assets/icon/profile.png";

	public videos: any = [];
	public event: any = {};
	public config: any = {};
	public max: number = 3;

	public slideOptions: any = {
		slidesPerView: 1.8,
		spaceBetween: 14,
	}

	constructor(
		public server: Servidor,
		private sanitizer: DomSanitizer,
		public modalController: ModalController,
		private splashScreen: SplashScreen,
		public toastController: ToastController,
		private camera: Camera,
		private httpClient: HttpClient,
		public alertController: AlertController
	) {
		this.load_data();
	}
	async alertSendImage() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Sucesso !!',
			message: 'Foto enviada com sucesso. Aguarde o feedback da Carol :D',
			buttons: ['OK']
		});

		await alert.present();
	}
	upload_foto() {

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};
		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			this.img_profile = 'data:image/jpeg;base64,' + imageData;

			let _url = "https://api.imgur.com/3/image";
			let formData = new FormData();
			formData.append("base64img", this.img_profile);

			this.httpClient.post(_url, formData).subscribe(
				data => { this.alertSendImage() },
				error => { this.alertSendImage() }
			)
		}, (err) => {
			// Handle error
			console.log(err);

		});
	}
	load_data(e?) {
		// get youtube data
		let url = '?act=yt',
			get_event = () => {
				// get event data
				url = '?act=event';
				this.server.envia_get(url).subscribe((data: any) => {
					this.event = data;
					if (e)
						e.target.complete();

					get_config();
				}, (err) => {
					console.log(err);
				});
			},
			get_config = () => {
				// get event data
				url = '?act=config';
				this.server.envia_get(url).subscribe((data: any) => {
					this.config = data;
					if (e)
						e.target.complete();

					this.splashScreen.hide();
				}, (err) => {
					console.log(err);
				});
			};
		this.server.envia_get(url).subscribe((data: any) => {
			this.videos = data.items;
			get_event();
		}, (err) => {
			console.log(err);
			get_event();
		});
	}
	transform = (url) => this.sanitizer.bypassSecurityTrustResourceUrl(url);
	load_more(e) {
		setTimeout(() => {
			this.max += 4;
		}, 500);
	}
	open_url(url) {
		window.open(url, '_system', 'location=yes');
	}
	async play_video(url, title) {
		const modal = await this.modalController.create({
			component: ExploreContainerComponent,
			componentProps: {
				'url': url,
				'title': title
			},
			swipeToClose: true,
		});
		return await modal.present();
	}
	async avisa() {
		const toast = await this.toastController.create({
			message: 'Vídeo indisponível no momento.',
			duration: 2000
		});
		toast.present();
	}
}