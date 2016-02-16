import UserModel from "../../main/model/UserModel";

describe("UserModel", function() {

	function createSubject() : UserModel { 
		return new UserModel({
			firstName : "Bence",
			lastName : "Eros"
		});
	}

	it("should have a constructor-set name", function() {
		var subject = createSubject();
		expect(subject.get("firstName")).toBe("Bence");
		expect(subject.firstName).toBe("Bence");
		expect(subject.lastName).toBe("Eros");
	});
	
	it("should initialize fullName", function() {
		var subject = createSubject();
		expect(subject.fullName).toBe("Bence Eros");
	});
	
	it("should update fullName on firstName change", function() {
		var subject = createSubject();
		subject.lastName = "Erős";
		expect(subject.fullName).toBe("Bence Erős");
	});
	
	it("should trigger fullName change", function() {
		var subject = createSubject();
		var propChangeListener = jasmine.createSpy("propChangeListener");
		subject.on("change:fullName", propChangeListener);
		subject.lastName = "Erős";
		expect(propChangeListener).toHaveBeenCalled();
	});
	
	it("should have default Foo Bar name", function() {
		var subject = new UserModel();
		expect(subject.firstName).toBe("Foo");
		expect(subject.lastName).toBe("Bar");
	});

});
