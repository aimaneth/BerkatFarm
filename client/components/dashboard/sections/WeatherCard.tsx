import { Sun, Wind, Droplet } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface WeatherInfo {
  current: {
    temp: string;
    condition: string;
    humidity: string;
    windSpeed: string;
  };
  forecast: Array<{
    day: string;
    temp: string;
    condition: string;
  }>;
}

interface WeatherCardProps {
  weatherInfo: WeatherInfo;
}

export function WeatherCard({ weatherInfo }: WeatherCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sun className="h-10 w-10 text-yellow-500 mr-4" />
          <div>
            <p className="text-2xl font-bold">{weatherInfo.current.temp}</p>
            <p className="text-gray-500">{weatherInfo.current.condition}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Droplet className="h-4 w-4 mr-2" />
            <span>{weatherInfo.current.humidity}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Wind className="h-4 w-4 mr-2" />
            <span>{weatherInfo.current.windSpeed}</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        {weatherInfo.forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm font-medium text-gray-500">{day.day}</p>
            <p className="text-lg font-semibold mt-1">{day.temp}</p>
            <p className="text-sm text-gray-500">{day.condition}</p>
          </div>
        ))}
      </div>
    </Card>
  );
} 