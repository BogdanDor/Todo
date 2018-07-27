;(function(win) {
	function TodoView(model) {
		model.attach('addTask', renderNew);

		function renderNewTask(data) {
			const task = new TaskView(data);
			const taskList = document.getElementById('task-list');
			taskList.appendChild(task);
			
			let input = document.getElementById('input');
			input.value = '';
		}

		model.attach('removeTask', deleteTask);

		function deleteTask(data) {
			const id = "id-" + data['index'];
			const taskList = document.getElementById('task-list');
			const task = document.getElementById(id);
			taskList.removeChild(task);
		}
	}

	win.app = win.app || {};
	win.app.TodoView = TodoView;
	const TaskView = win.app.TaskView;
})(window);
