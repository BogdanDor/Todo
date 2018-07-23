;(function() {
	document.onreadystatechange = function() {
		switch (document.readyState) {
			case 'loading':
				break;
			case 'interactive': 
				break;
			case 'complete': {
				(function complete() {
					const model = new app.TodoModel();
					const controller = new app.TodoController(model);
					const view = new app.TodoView(model);
				})();
				break;
			}
			default:
		}
	}
})();
