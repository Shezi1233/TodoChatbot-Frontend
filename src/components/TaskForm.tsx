"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TaskFormProps {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>
  initialData?: {
    title: string
    description?: string
  }
  onCancel?: () => void
  isLoading?: boolean
}

export function TaskForm({
  onSubmit,
  initialData,
  onCancel,
  isLoading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      if (!initialData) {
        setTitle("")
        setDescription("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-[10px] uppercase tracking-widest font-black text-white/30 px-1">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          placeholder="What needs to be done?"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-[10px] uppercase tracking-widest font-black text-white/30 px-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none min-h-[120px]"
          placeholder="Add some details..."
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-white/40 hover:text-white"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="yellow"
          className="px-8 rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Task"}
        </Button>
      </div>
    </form>
  )
}
