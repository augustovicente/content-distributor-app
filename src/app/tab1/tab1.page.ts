import { Component } from '@angular/core';
import { Servidor } from '../providers/server';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page
{
	public videos:any = [];
	public max:number = 3;
	constructor(
		server: Servidor,
		private sanitizer: DomSanitizer
	)
	{
		let url = '?act=yt';
		server.envia_get(url).subscribe((data:any)=>{
			this.videos = data.items;
		},(err)=> {
			console.log(err)
		});
	}
	transform = (url) => this.sanitizer.bypassSecurityTrustResourceUrl(url);
	loadData(e)
	{
		setTimeout(() => {
			e.target.complete();
			this.max += 4;
		}, 500);
	}
}