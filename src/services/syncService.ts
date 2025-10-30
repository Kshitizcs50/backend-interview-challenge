import { TaskService } from "./taskService";
import { Task } from "../types";

export class SyncService {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  // Simulated sync logic
  async syncPendingTasks(): Promise<void> {
    const pendingTasks = await this.taskService.getTasksNeedingSync();

    for (const task of pendingTasks) {
      try {
        // Imagine this calls a remote API
        await this.syncTaskToRemote(task);
        await this.taskService.updateTask(task.id, { sync_status: "synced" });
      } catch (err) {
        await this.taskService.updateTask(task.id, { sync_status: "error" });
      }
    }
  }

  private async syncTaskToRemote(_task: Task): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (Math.random() < 0.1) throw new Error("Random sync failure");
}

}
