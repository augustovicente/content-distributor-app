import { Component } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
declare var pdfjsLib;
@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{
	public path: string = 'ebook.pdf';
	private win: any = window;
	constructor(
		private platform: Platform
	){}
}