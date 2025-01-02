import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  TrendingUp,
  Activity,
  BarChart2,
  LineChart,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Heart,
  Target,
} from 'lucide-react';

const growthPredictions = [
  {
    id: 1,
    category: 'Dairy Cows',
    currentWeight: '550 kg',
    predictedWeight: '580 kg',
    timeframe: '3 months',
    confidence: '92%',
    trend: 'up',
  },
  {
    id: 2,
    category: 'Beef Cattle',
    currentWeight: '480 kg',
    predictedWeight: '520 kg',
    timeframe: '3 months',
    confidence: '88%',
    trend: 'up',
  },
];

const healthTrends = [
  {
    id: 1,
    metric: 'Disease Resistance',
    value: '95%',
    change: '+2%',
    status: 'improving',
    details: 'Strong immunity levels across herd',
  },
  {
    id: 2,
    metric: 'Stress Levels',
    value: 'Low',
    change: '-5%',
    status: 'optimal',
    details: 'Reduced environmental stressors',
  },
  {
    id: 3,
    metric: 'Nutrition Score',
    value: '88/100',
    change: '+3',
    status: 'good',
    details: 'Balanced diet maintenance',
  },
];

const performanceMetrics = [
  {
    id: 1,
    metric: 'Milk Production',
    current: '28 L/day',
    target: '30 L/day',
    progress: '93%',
    trend: 'up',
  },
  {
    id: 2,
    metric: 'Feed Efficiency',
    current: '1.8 kg/L',
    target: '1.6 kg/L',
    progress: '89%',
    trend: 'stable',
  },
  {
    id: 3,
    metric: 'Reproduction Rate',
    current: '85%',
    target: '90%',
    progress: '94%',
    trend: 'up',
  },
];

const riskAssessment = [
  {
    id: 1,
    category: 'Health Risks',
    level: 'Low',
    factors: ['Regular checkups', 'Good hygiene', 'Vaccination schedule'],
    trend: 'improving',
  },
  {
    id: 2,
    category: 'Production Risks',
    level: 'Medium',
    factors: ['Weather changes', 'Feed quality variations'],
    trend: 'stable',
  },
];

export function AdvancedAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Predictions */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Growth Predictions</h3>
            <Button variant="outline" size="sm">
              <BarChart2 className="w-4 h-4 mr-2" />
              View Trends
            </Button>
          </div>
          <div className="space-y-4">
            {growthPredictions.map((prediction) => (
              <div
                key={prediction.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Scale className="w-5 h-5 text-blue-500" />
                    <p className="font-medium text-gray-900">{prediction.category}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {prediction.confidence} Confidence
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-sm font-medium text-gray-900">{prediction.currentWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Predicted</p>
                    <p className="text-sm font-medium text-gray-900">{prediction.predictedWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timeframe</p>
                    <p className="text-sm font-medium text-gray-900">{prediction.timeframe}</p>
                  </div>
                  <div className="flex items-center">
                    {prediction.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Trends */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Health Trends</h3>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {healthTrends.map((trend) => (
              <div
                key={trend.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900">{trend.metric}</p>
                      <p className="text-sm text-gray-500">{trend.details}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    trend.status === 'improving'
                      ? 'bg-green-100 text-green-700'
                      : trend.status === 'optimal'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {trend.value}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${
                    trend.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {trend.change} change
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Set Targets
            </Button>
          </div>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div
                key={metric.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{metric.metric}</p>
                  <div className="flex items-center space-x-2">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    )}
                    <span className="text-sm text-gray-500">{metric.progress}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-sm font-medium text-gray-900">{metric.current}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-sm font-medium text-gray-900">{metric.target}</p>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: metric.progress }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Assessment */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
            <Button variant="outline" size="sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              View All Risks
            </Button>
          </div>
          <div className="space-y-4">
            {riskAssessment.map((risk) => (
              <div
                key={risk.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      risk.level === 'Low' ? 'text-green-500' : 'text-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{risk.category}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        risk.level === 'Low'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.level} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Contributing Factors:</p>
                  <ul className="space-y-1">
                    {risk.factors.map((factor, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 