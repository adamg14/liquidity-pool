'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { ToggleButton } from "./toggle-button"
import { ArrowDown } from 'lucide-react'

export function LiquidityPortal() {
  const [isAdd, setIsAdd] = useState(true)
  const [amount0, setAmount0] = useState('')
  const [amount1, setAmount1] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${isAdd ? 'Adding' : 'Removing'} liquidity:`, { amount0, amount1 })
  }

  return (
    <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
      <CardHeader>
        <CardTitle className="text-white text-center">
          {isAdd ? 'Add' : 'Remove'} Liquidity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ToggleButton isAdd={isAdd} onToggle={setIsAdd} />
          
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                className="bg-blue-800 border-blue-700 text-white placeholder:text-gray-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">USDC</span>
            </div>

            <div className="flex justify-center">
              <div className="bg-blue-700 rounded-full p-2">
                <ArrowDown className="w-4 h-4 text-gray-300" />
              </div>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                className="bg-blue-800 border-blue-700 text-white placeholder:text-gray-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">ETH</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isAdd ? 'Add' : 'Remove'} Liquidity
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

