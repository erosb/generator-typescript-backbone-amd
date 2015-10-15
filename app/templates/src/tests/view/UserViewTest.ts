import UserView = require("../../view/UserView");
import UserModel = require("../../model/UserModel");

describe("UserViewTest", function() {

	function createModel() {
		return new UserModel({
			firstName : "Foo",
			lastName : "Bar"
		});
	}

	it("should display initial name", function() {
		var model = createModel();
		var view = new UserView({model: model});
		expect(view.render().$("#userName").text()).toBe("Foo Bar");
	});
	
	it("should update displayed name", function() {
		var model = createModel();
		var view = new UserView({model: model});
		view.render();
		model.lastName = "Baz";
		expect(view.$("#userName").text()).toBe("Foo Baz");
	});
	
	it("should write back first/lastName to the model", function() {
		var model = createModel();
		var view = new UserView({model: model});
		view.render();
		view.$("[name=firstName]").val("Changed");
		view.nameTextChanged();
		expect(model.firstName).toBe("Changed");
	});

});
