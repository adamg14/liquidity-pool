'use client'

import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"

interface ToggleButtonProps {
  isAdd: boolean
  onToggle: (value: boolean) => void
}

export function ToggleButton({ isAdd, onToggle }: ToggleButtonProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Label htmlFor="liquidity-mode" className="text-slate-200">Remove</Label>
      <Switch
        id="liquidity-mode"
        checked={isAdd}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="liquidity-mode" className="text-slate-200">Add</Label>
    </div>
  )
}

