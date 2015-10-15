define([], function() {
	return function() {
		require(['jasmine-boot'], function () {
			require(['tests/model/UserModelTest', 'tests/view/UserViewTest'], function(){
				window.onload();
			})
		});
	}
});
