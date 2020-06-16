import { Component } from '@angular/core';
import { Servidor } from '../providers/server';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page
{
	public videos:any = [];
	public event:any = {};
	public max:number = 3;
	constructor(
		public server: Servidor,
		private sanitizer: DomSanitizer,
		public modalController: ModalController
	)
	{
		this.load_data();
	}
	load_data(e?)
	{
		// get youtube data
		let url = '?act=yt',
			get_event = ()=>
			{
				// get event data
				url = '?act=event';
				this.server.envia_get(url).subscribe((data:any)=>
				{
					this.event = data;
					if(e) 
						e.target.complete();
				},(err)=>
				{
					console.log(err);
				});
			};
		this.server.envia_get(url).subscribe((data:any)=>
		{
			this.videos = data.items;
			get_event();
		},(err)=>
		{
			console.log(err);
			get_event();
		});
	}
	transform = (url) => this.sanitizer.bypassSecurityTrustResourceUrl(url);
	load_more(e)
	{
		setTimeout(() => {
			this.max += 4;
		}, 500);
	}
	open_url(url)
	{
		window.open(url, '_system', 'location=yes');
	}
	async play_video(url, title)
	{
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
}