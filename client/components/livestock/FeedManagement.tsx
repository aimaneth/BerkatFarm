import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Utensils,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Scale,
  Leaf,
  BarChart3,
} from 'lucide-react';

const feedInventory = [
  {
    id: 1,
    type: 'Hay',
    quantity: '2,500 kg',
    location: 'Storage A',
    lastRestocked: '2024-01-10',
    reorderPoint: '500 kg',
    status: 'Adequate',
  },
  {
    id: 2,
    type: 'Grain Mix',
    quantity: '800 kg',
    location: 'Storage B',
    lastRestocked: '2024-01-15',
    reorderPoint: '200 kg',
    status: 'Low',
  },
];

const consumptionData = [
  {
    id: 1,
    animalGroup: 'Dairy Cows',
    dailyAverage: '12.5 kg',
    monthlyTotal: '9,375 kg',
    cost: '$3,750',
    trend: 'stable',
  },
  {
    id: 2,
    animalGroup: 'Beef Cattle',
    dailyAverage: '10.2 kg',
    monthlyTotal: '7,650 kg',
    cost: '$3,060',
    trend: 'increasing',
  },
];

const nutritionalAnalysis = [
  {
    id: 1,
    feedType: 'Hay',
    protein: '12%',
    fiber: '28%',
    energy: '2.2 Mcal/kg',
    minerals: 'Adequate',
    quality: 'Good',
  },
  {
    id: 2,
    feedType: 'Grain Mix',
    protein: '18%',
    fiber: '15%',
    energy: '3.0 Mcal/kg',
    minerals: 'High',
    quality: 'Excellent',
  },
];

export function FeedManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feed Inventory */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Feed Inventory</h3>
            <Button variant="outline" size="sm">
              <Package className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </div>
          <div className="space-y-4">
            {feedInventory.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Utensils className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.location}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'Adequate'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-sm font-medium text-gray-900">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reorder Point</p>
                    <p className="text-sm font-medium text-gray-900">{item.reorderPoint}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Restocked</p>
                    <p className="text-sm font-medium text-gray-900">{item.lastRestocked}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Consumption Tracking */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Consumption Tracking</h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
          <div className="space-y-4">
            {consumptionData.map((group) => (
              <div
                key={group.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Scale className="w-5 h-5 text-indigo-500" />
                    <p className="font-medium text-gray-900">{group.animalGroup}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${
                      group.trend === 'stable' ? 'text-green-500' : 'text-yellow-500'
                    }`} />
                    <span className="text-sm text-gray-500 capitalize">{group.trend}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Daily Avg</p>
                    <p className="text-sm font-medium text-gray-900">{group.dailyAverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Total</p>
                    <p className="text-sm font-medium text-gray-900">{group.monthlyTotal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cost</p>
                    <p className="text-sm font-medium text-gray-900">{group.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Nutritional Analysis */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Nutritional Analysis</h3>
            <Button variant="outline" size="sm">
              <Leaf className="w-4 h-4 mr-2" />
              Update Analysis
            </Button>
          </div>
          <div className="space-y-4">
            {nutritionalAnalysis.map((feed) => (
              <div
                key={feed.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{feed.feedType}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        feed.quality === 'Excellent'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {feed.quality}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="text-sm font-medium text-gray-900">{feed.protein}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fiber</p>
                    <p className="text-sm font-medium text-gray-900">{feed.fiber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Energy</p>
                    <p className="text-sm font-medium text-gray-900">{feed.energy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Minerals</p>
                    <p className="text-sm font-medium text-gray-900">{feed.minerals}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 