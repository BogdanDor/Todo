;(function(win) {
	function TaskView(model) {
		const element = render(model['task']);
		model.attach(change);
		return element;

		function render(task) {	
			const toggle = document.createElement('input');
			toggle.type = 'checkbox';
			toggle.classList.add('toggle');

			const title = document.createElement('div');
			title.textContent = task['title'];
			title.classList.add('task-title');
			
			const buttonDelete = document.createElement('button');
			buttonDelete.classList.add('button-delete');
			
			const element = document.createElement('div');
			element.id = 'id-' + task['index'];
			element.classList.add('task');
			element.appendChild(toggle);
			element.appendChild(title);
			element.appendChild(buttonDelete);

			return element;
		}

		function change(task) {
			const id = "id-" + task['index'];
			const title = element.getElementsByClassName('task-title')[0];
			if (task['isCompleted']) {
				title.classList.add('task-completed');
			} else {
				title.classList.remove('task-completed');
			}		
		}
	}
	
	win.app = win.app || {};
	win.app.TaskView = TaskView;
})(window);