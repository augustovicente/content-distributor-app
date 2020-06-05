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
		let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBxlgLjt6JMoM5CkXEbv0rMkTeTqSRDi4o&channelId=UCiX2H3Kf-O_FiB9rGLcrBnA&part=snippet,id&maxResults=1000&order=date';
		server.envia_get(url).subscribe((data:any)=>{
			this.videos = data.items;
		},(err)=> {
			console.log(err)
			url = 'http://augusto.sqdtec.com/docs/canal.json';
			server.envia_get(url).subscribe((data:any)=>{
				this.videos = data.items;
			},(err)=> {
				console.log(err)
			})
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