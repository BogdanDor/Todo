;(function(win) {
	function TodoController(model) {
		let input = document.getElementById('input');
		input.addEventListener('keyup', function(evt) {
			const ENTER_CODE = 13;
			if (evt.keyCode == ENTER_CODE) {
				const text = input.value;
				model.addTask(text);
			}
		});
		const taskList = document.getElementById('task-list');
		taskList.addEventListener('click', function(evt) {
			if (!evt.target.classList.contains('button-delete')) {
				return;
			}
			const id = evt.target.parentElement.id;
			const index = parseInt(id.replace('id-', ''), 10);
			model.removeTask(index);
		});
		taskList.addEventListener('change', function(evt) {
	 		if (!evt.target.classList.contains('toggle')) {
	 			return
	 		}
			const id = evt.target.parentElement.id;
			const index = parseInt(id.replace('id-', ''), 10);
			const isCompleted = evt.target.checked;
			const taskModel = model.getTaskModel(index);
			taskModel.setCompleted(isCompleted);
		});
	}

	win.app = win.app || {};
	win.app.TodoController = TodoController;	
})(window);