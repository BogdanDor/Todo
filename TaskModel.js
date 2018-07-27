;(function(win) {
	function TaskModel(index, title) {
		const handlers = [];
		
		this.task = {
			index: index,
			title: title,
			isCompleted: false
		}

	  this.attach = function(fn) {
			handlers.push(fn);
		}
		
		this.detach = function(fn) {
			const index = handlers.indexOf(fn);
			if (index != -1) {
				handlers.splice(index, 1);
			}
		}

		this.setCompleted = function(value) {
			this.task.isCompleted = value;
			notify(this.task);
		}

		function notify(data) {
			handlers.forEach(function(fn) {
				fn(data);
			});
		}
	}

	win.app = win.app || {};
	win.app.TaskModel = TaskModel;
})(window);