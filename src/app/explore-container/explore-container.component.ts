import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
	selector: 'app-explore-container',
	templateUrl: './explore-container.component.html',
	styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent
{
	@Input() url: string;
	@Input() title: string;
	constructor(
		public modalController: ModalController
	) { }
	closeModal()
	{
        this.modalController.dismiss();
    }
}