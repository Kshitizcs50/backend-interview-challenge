// src/services/taskService.ts
import { Database } from "../db/database";
import { Task } from "../types";

export class TaskService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  // CREATE a task
  async createTask(task: Task): Promise<Task> {
    return await this.db.insert("tasks", task);
  }

  // UPDATE a task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const existing = await this.db.findById("tasks", id);
    if (!existing || existing.is_deleted) return null;

    const updated = { ...existing, ...updates };
    await this.db.update("tasks", id, updated);
    return updated;
  }

  // DELETE (soft delete)
  async deleteTask(id: string): Promise<boolean> {
    const existing = await this.db.findById("tasks", id);
    if (!existing) return false;

    existing.is_deleted = true;
    await this.db.update("tasks", id, existing);
    return true;
  }

  // GET a single task
  async getTask(id: string): Promise<Task | null> {
    const task = await this.db.findById("tasks", id);
    if (!task || task.is_deleted) return null;
    return task;
  }

  // GET all non-deleted tasks
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.db.findAll("tasks");
    return tasks.filter(t => !t.is_deleted);
  }

  // GET tasks that need sync
  async getTasksNeedingSync(): Promise<Task[]> {
    const tasks = await this.db.findAll("tasks");
    return tasks.filter(
      t => t.sync_status === "pending" || t.sync_status === "error"
    );
  }
}
