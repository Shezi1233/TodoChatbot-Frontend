"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Edit2, Trash2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TaskItemProps {
  task: {
    id: number
    title: string
    description?: string
    completed: boolean
    created_at: string
  }
  onToggle: (completed: boolean) => Promise<void>
  onEdit: () => void
  onDelete: () => Promise<void>
  isLoading?: boolean
}

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  isLoading = false,
}: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

  return (
    <div
      className={cn(
        "group relative p-5 border border-white/5 rounded-xl bg-white/5 transition-all hover:bg-white/10 hover:border-white/10",
        task.completed && "opacity-50"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(!task.completed)}
          disabled={isLoading}
          className="mt-1 transition-transform active:scale-95"
        >
          {task.completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-white/20 group-hover:text-primary/50 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "text-lg font-semibold text-white transition-all",
              task.completed && "line-through text-white/30"
            )}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-white/50 mt-1 text-sm line-clamp-2">{task.description}</p>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/30">
              <Calendar className="h-3 w-3" />
              {new Date(task.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            disabled={isLoading || task.completed}
            className="h-8 w-8 text-white/40 hover:text-primary hover:bg-primary/10"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting || isLoading}
            className="h-8 w-8 text-white/40 hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
