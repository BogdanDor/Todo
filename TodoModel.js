;(function(win) {
	function TodoModel() {
		const handlers = {
			'addTask': [],
			'removeTask': [],
			'changeTask': []
		}
		const tasks = [];

	  this.attach = function(type, fn) {
			handlers[type].push(fn);
		}
		
		this.detach = function(type, fn) {
			const index = handlers[type].indexOf(fn);
			if (index != -1) {
				handlers.splice(index, 1);
			}
		}

		this.addTask = function(title) {
		  const index = (new Date()).getTime();
			tasks[index] = {
				title: title,
				isCompleted: false
			}
			const data = {
				index: index,
				title: title
			}
			notify('addTask', data);
		}

		this.removeTask = function(index) {
			tasks.splice(index, 1);
			const data = {
				index: index
			}
			notify('removeTask', data);
		}

		this.setTaskCompleted = function(index, value) {
			const task = tasks[index];
			task['isCompleted'] = value;
			data = {
				index: index,
				title: task['title'],
				isCompleted: value
			}
			notify('changeTask', data);
		}

		function notify(type, data) {
			handlers[type].forEach(function(el) {
				el(data);
			});
		}
	}

	win.app = win.app || {};
	win.app.TodoModel = TodoModel;
})(window);
