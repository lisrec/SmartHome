import { Component } from '@angular/core';
import { Sha256 } from './functions/sha256';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent  {
	hashedPass: string = "...";
	password: string;

	constructor(private sha256: Sha256) {}

	hashPass() {
		this.hashedPass = this.sha256.hash(this.password, {msgFormat: 'string'});
	}
}
