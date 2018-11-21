import BaseView from '../BaseView/BaseView.mjs';
import landingView from '../LandingView/landingView.pug';

export default class Landing extends BaseView {
	constructor() {
		const landingViewContent = landingView({'title': 'Пираты'});
		super(landingViewContent);

		const backButton = document.getElementsByClassName('basicButton_back');
		backButton[0].hidden = true;
	}
}