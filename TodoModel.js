;(function(win) {
	function TodoModel() {
		const handlers = {
			'addTask': [],
			'removeTask': []
		};
		const taskModelCollection = [];

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
		  const taskModel = new TaskModel(index, title);
			taskModelCollection[index] = taskModel;
			notify('addTask', taskModel);
		}

		this.getTaskModel = function(index) {
			return taskModelCollection[index];
		}

		this.removeTask = function(index) {
			taskModelCollection.splice(index, 1);
			const data = {
				index: index
			}
			notify('removeTask', data);
		}

		function notify(type, data) {
			handlers[type].forEach(function(el) {
				el(data);
			});
		}
	}

	win.app = win.app || {};
	win.app.TodoModel = TodoModel;
	const TaskModel = win.app.TaskModel;
})(window);
