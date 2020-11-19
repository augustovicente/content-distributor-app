import { Component } from '@angular/core';
import { Servidor } from 'src/app/providers/server';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
	selector: 'app-ebook',
	templateUrl: './ebook.page.html',
	styleUrls: ['./ebook.page.scss'],
})

export class ProfilePage
{
	img_profile = "../../assets/icon/profile.png";

	constructor(
		private servidor: Servidor, 
		private camera: Camera
	){}

	upload_foto()
	{
		console.log('teste');
		
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};
		this.camera.getPicture(options).then((imageData) =>
		{
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			this.img_profile = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
			// Handle error
			console.log(err);
			
		});
	}
}