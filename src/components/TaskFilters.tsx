"use client"

import { cn } from "@/lib/utils"

interface TaskFiltersProps {
  currentFilter: string
  currentSort: string
  onFilterChange: (filter: string) => void
  onSortChange: (sort: string) => void
}

export function TaskFilters({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ]

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all",
              currentFilter === f.value
                ? "bg-primary text-black"
                : "text-white/40 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-[10px] uppercase tracking-widest font-black text-white/30">Sort by</label>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-black border border-white/10 rounded-lg px-4 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  )
}
