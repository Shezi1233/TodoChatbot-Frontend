"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/AuthProvider"
import { TaskList } from "@/components/TaskList"
import { TaskFilters } from "@/components/TaskFilters"
import { TaskForm } from "@/components/TaskForm"
import { taskApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [error, setError] = useState("")

  const userId = user?.id || ""

  const fetchTasks = async () => {
    if (!userId) return

    try {
      const data = await taskApi.list(userId, filter === "all" ? undefined : filter, sort)
      const formattedTasks = Array.isArray(data) ? data.map((task: any) => ({
        id: Number(task.id) || 0,
        title: String(task.title || "Untitled"),
        description: task.description ? String(task.description) : undefined,
        completed: Boolean(task.completed),
        created_at: task.created_at ? String(task.created_at) : new Date().toISOString(),
        updated_at: task.updated_at ? String(task.updated_at) : new Date().toISOString(),
      })) : []
      setTasks(formattedTasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [userId, filter, sort])

  const handleCreateTask = async (data: { title: string; description?: string }) => {
    try {
      await taskApi.create(userId, data)
      setShowForm(false)
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task")
    }
  }

  const handleUpdateTask = async (data: { title: string; description?: string }) => {
    if (!editingTask) return

    try {
      await taskApi.update(userId, editingTask.id, data)
      setEditingTask(null)
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      await taskApi.delete(userId, taskId)
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task")
    }
  }

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    try {
      await taskApi.toggle(userId, taskId, completed)
      fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle task")
    }
  }

  if (!user) return null

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">My Tasks</h1>
          <p className="text-white/40 text-xs sm:text-sm font-medium mt-1">Manage your daily workflow and stay productive.</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingTask(null)
          }}
          variant="yellow"
          className="rounded-full px-6 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
        >
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? "Close" : "New Task"}
        </Button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {(showForm || editingTask) && (
        <div className="mb-8 sm:mb-12 p-4 sm:p-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {editingTask ? "Edit Task" : "Quick Add"}
          </h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={
              editingTask
                ? {
                    title: editingTask.title,
                    description: editingTask.description,
                  }
                : undefined
            }
            onCancel={() => {
              setShowForm(false)
              setEditingTask(null)
            }}
          />
        </div>
      )}

      <div className="space-y-6">
        <TaskFilters
          currentFilter={filter}
          currentSort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/30 font-medium animate-pulse">Fetching your workspace...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}
      </div>
    </div>
  )
}
