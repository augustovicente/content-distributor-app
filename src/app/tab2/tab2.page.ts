import { Component } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{
	constructor(private document: DocumentViewer)
	{
		const options: DocumentViewerOptions = {
			title: 'E-Book'
		}
		console.log(this.document.viewDocument('assets/ebook.pdf', 'application/pdf', options))
	}
}
