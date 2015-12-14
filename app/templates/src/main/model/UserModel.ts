import Backbone = require("backbone");


class UserModel extends Backbone.Model {

	get firstName() : string { return this.get("firstName"); }
	set firstName(firstName: string) { this.set("firstName", firstName); }
	
	get lastName() : string { return this.get("lastName"); }
	set lastName(lastName: string) { this.set("lastName", lastName); }
	
	get fullName() : string {
		return this.firstName + " " + this.lastName;
	}
	
	defaults() {
		return {
			firstName : "Foo",
			lastName : "Bar"
		}
	}
	
	initialize(attributes: any = {}) {
		this.on("change:firstName change:lastName", () => this.set("fullName", this.fullName));
	}
	
}

export = UserModel;
