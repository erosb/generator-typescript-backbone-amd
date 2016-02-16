import $ = require("jquery");
import UserView from "./view/UserView";
import UserModel from "./model/UserModel";

export default function app() {
	$("body").append(new UserView({model : new UserModel()}).render().$el);
}
