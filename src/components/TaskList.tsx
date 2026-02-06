"use client"

import { TaskItem } from "./TaskItem"
import { ListTodo } from "lucide-react"

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: number) => Promise<void>
  onToggle: (taskId: number, completed: boolean) => Promise<void>
  isLoading?: boolean
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggle,
  isLoading = false,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <ListTodo className="h-8 w-8 text-white/20" />
        </div>
        <p className="text-white/60 font-medium">No tasks found</p>
        <p className="text-white/30 text-sm mt-1">Start by adding a new task above!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={(completed) => onToggle(task.id, completed)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
