'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DonutChart } from '../components/donut-chart'
import { LiquidityPortal } from '../components/liquidity-portal'
import { ArrowUpDown, Clock, DollarSign, LineChart, Wallet } from 'lucide-react'
import { jetbrainsMono } from './fonts'

export default function PoolPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const poolData = {
    token0: {
      symbol: 'USDC',
      price: '$1.00',
      change: '0.00%'
    },
    token1: {
      symbol: 'ETH',
      price: '$2,235.34',
      change: '+2.34%'
    },
    stats: {
      tvl: '$45.2M',
      volume24h: '$12.3M',
      fees24h: '$32.4K',
      apr: '12.45%'
    }
  }

  const distributionData = [
    { token: 'USDC', percentage: 50, color: '#2775CA' },
    { token: 'ETH', percentage: 50, color: '#627EEA' }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 text-slate-200 ${jetbrainsMono.className}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <header className="relative border-b border-slate-800 p-4 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">ADAM/ETH Liquidity Pool</h1>
              {/* <span className="text-sm text-gray-300">0.05%</span> */}
            </div>
            <Button 
              variant="default" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="TVL" 
            value={poolData.stats.tvl} 
            icon={<DollarSign className="w-5 h-5" />} 
          />
          <StatCard 
            title="24h Volume" 
            value={poolData.stats.volume24h} 
            icon={<ArrowUpDown className="w-5 h-5" />} 
          />
          <StatCard 
            title="24h Fees" 
            value={poolData.stats.fees24h} 
            icon={<Clock className="w-5 h-5" />} 
          />
          <StatCard 
            title="APR" 
            value={poolData.stats.apr} 
            icon={<LineChart className="w-5 h-5" />} 
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DonutChart data={distributionData} />
          </div>
          <div>
            <LiquidityPortal />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-blue-900/50 border-blue-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-blue-900/80 backdrop-blur-xl border-blue-800">
              <CardHeader>
                <CardTitle className="text-white">Pool Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Pool Address</span>
                    <span className="text-white">0x9Db9...425B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fee Tier</span>
                    <span className="text-white">0.05%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tick Range</span>
                    <span className="text-white">-887220 → 887220</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="positions">
            <Card className="bg-blue-900/80 backdrop-blur-xl border-blue-800">
              <CardContent className="p-8 text-center text-gray-300">
                Connect your wallet to view your positions
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions">
            <Card className="bg-blue-900/80 backdrop-blur-xl border-blue-800">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-blue-800 rounded-lg hover:bg-blue-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <ArrowUpDown className="w-4 h-4 text-gray-300" />
                        <div>
                          <p className="text-sm font-medium text-white">Swap</p>
                          <p className="text-xs text-gray-300">1,123.45 USDC for 0.5 ETH</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">2 mins ago</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="bg-blue-900/80 backdrop-blur-xl border-blue-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-700 rounded-lg">
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-300">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}