class AsyncQueue {
    constructor({ maxParallelTasks = 5 }) {
        this.maxParallelTasks = maxParallelTasks;
        this.queue = [];
        this.executingPromisesCount = 0;
        this.executingPromises = [];

        this.clear();
    }

    clear() {
        this.queue = [];
        this.executingPromisesCount = 0;
        this.executingPromises = [];
    }

    addTask(task, urgently) {
        return new Promise((resolve, reject) => {
            if (!this.queue.length && this.executingPromises.length < this.maxParallelTasks) {
                this.runTask(task, resolve, reject);
                return;
            }
            const taskData = {
                task,
                resolve,
                reject,
            };
            if (urgently) {
                this.queue.unshift(taskData);
            } else {
                this.queue.push(taskData);
            }
        });
    }

    removeTask({ taskKey }) {
        this.queue = this.queue.filter(q => q.task.key !== taskKey);
        this.executingPromises = this.executingPromises.filter(k => k !== taskKey);
    }

    changeMaxParallelTasks(value) {
        if (!value) return;
        this.maxParallelTasks = Math.max(1, this.maxParallelTasks + value);
        if (value < 0) return;
        Array(value)
            .fill(0)
            .map(() => this.runNextTask());
    }

    runTask(task, resolve, reject) {
        this.executingPromises.push(task.key);
        this.executingPromisesCount++;
        setTimeout(() => this.processTask(task, resolve, reject), 0);
    }

    async processTask(task, resolve, reject) {
        try {
            const res = await task.task();
            setTimeout(() => resolve(res), 0);
        } catch (e) {
            setTimeout(() => reject(e), 0);
        }
        this.executingPromisesCount--;
        this.executingPromises = this.executingPromises.filter(k => k !== task.key);

        this.runNextTask();
    }

    runNextTask() {
        if (!this.queue.length) return;
        if (this.executingPromisesCount >= this.maxParallelTasks) return;
        const { task, resolve, reject } = this.queue.shift();
        this.runTask(task, resolve, reject);
    }
}

export default AsyncQueue;
