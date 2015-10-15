/// <amd-dependency path="text!../template/UserView.html" />

import Backbone = require("backbone");
import UserModel = require("../model/UserModel");
import Handlebars = require("handlebars");

declare var require:(moduleId:string) => any;
var template = require("text!../template/UserView.html");

class UserView extends Backbone.View<UserModel> {

	protected template: (params?: any) => string;

	initialize(options: any = {}) {
		this.template = Handlebars.compile(template);
		options.model.on("change", this.updateFullName.bind(this));
	}
	
	events() {
		return {
			"keyup [name=firstName],[name=lastName]" : "nameTextChanged"
		};
	}
	
	nameTextChanged() {
		this.model.set({
			firstName : this.$("[name=firstName]").val(),
			lastName : this.$("[name=lastName]").val()
		});
	}
	
	updateFullName() {
		this.$("#userName").text(this.model.fullName);
	}
	
	render() {
		this.$el.html(this.template({
			firstName : this.model.firstName,
			lastName : this.model.lastName,
			fullName : this.model.fullName
		}));
		return this;
	}
}

export = UserView;
