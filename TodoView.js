;(function(win) {
	function TodoView(model) {
		model.attach('addTask', renderNewTask);

		function renderNewTask(data) {	
			const toggle = document.createElement('input');
			toggle.type = 'checkbox';
			toggle.classList.add('toggle');

			const taskTitle = document.createElement('div');
			taskTitle.textContent = data['task']['title'];
			taskTitle.classList.add('task-title');
			
			const buttonDelete = document.createElement('button');
			buttonDelete.classList.add('button-delete');
			
			const task = document.createElement('div');
			task.id = 'id-' + data['task']['index'];
			task.classList.add('task');
			task.appendChild(toggle);
			task.appendChild(taskTitle);
			task.appendChild(buttonDelete);

			const taskList = document.getElementById('task-list');
			taskList.appendChild(task);
			
			let input = document.getElementById('input');
			input.value = '';

			data.attach(changeTask);
		}

		model.attach('removeTask', deleteTask);

		function deleteTask(data) {
			const id = "id-" + data['index'];
			const taskList = document.getElementById('task-list');
			const task = document.getElementById(id);
			taskList.removeChild(task);
		}
		
		function changeTask(data) {
			const id = "id-" + data['index'];
			const task = document.getElementById(id);
			const taskTitle = task.getElementsByClassName('task-title')[0];
			if (data['isCompleted']) {
				taskTitle.classList.add('task-completed');
			} else {
				taskTitle.classList.remove('task-completed');
			}		
		}
	}

	win.app = win.app || {};
	win.app.TodoView = TodoView;
})(window);
