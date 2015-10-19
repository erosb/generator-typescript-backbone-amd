/// <amd-dependency path="text!../template/UserView.html" />

import Backbone = require("backbone");
import UserModel = require("../model/UserModel");
import Handlebars = require("handlebars");

var template = Handlebars.compile(require("text!../template/UserView.html"));

class UserView extends Backbone.View<UserModel> {

    private template = template;

    initialize(options: any = {}) {
        this.listenTo(this.model, "change", this.updateFullName.bind(this));
    }

    events() {
        return {
            "keyup [name=firstName],[name=lastName]": "nameTextChanged"
        };
    }

    nameTextChanged() {
        this.model.set({
            firstName: this.$("[name=firstName]").val(),
            lastName: this.$("[name=lastName]").val()
        });
    }

    updateFullName() {
        this.$("#userName").text(this.model.fullName);
    }

    render() {
        this.$el.html(this.template(this.model));
        return this;
    }
}

export = UserView;
