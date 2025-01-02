import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Scan,
  Camera,
  Mic,
  Wifi,
  WifiOff,
  Upload,
  Image as ImageIcon,
  Tag,
  Save,
  RefreshCw,
} from 'lucide-react';

const offlineData = [
  {
    id: 1,
    type: 'Weight Record',
    animal: 'COW-123',
    timestamp: '2024-01-20 14:30',
    status: 'Pending Sync',
    data: '545 kg',
  },
  {
    id: 2,
    type: 'Health Check',
    animal: 'COW-456',
    timestamp: '2024-01-20 15:15',
    status: 'Synced',
    data: 'Temperature: 38.5°C',
  },
];

const recentPhotos = [
  {
    id: 1,
    animal: 'COW-789',
    type: 'Health Documentation',
    timestamp: '2024-01-20 13:45',
    status: 'Uploaded',
    notes: 'Wound healing progress',
  },
  {
    id: 2,
    animal: 'COW-234',
    type: 'Body Condition',
    timestamp: '2024-01-20 14:00',
    status: 'Pending Upload',
    notes: 'Monthly condition assessment',
  },
];

const voiceNotes = [
  {
    id: 1,
    animal: 'COW-567',
    duration: '0:45',
    timestamp: '2024-01-20 11:30',
    status: 'Transcribed',
    notes: 'Behavioral observations',
  },
  {
    id: 2,
    animal: 'COW-890',
    duration: '1:20',
    timestamp: '2024-01-20 12:15',
    status: 'Pending Transcription',
    notes: 'Feeding pattern notes',
  },
];

export function MobileFeatures() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 space-y-2"
            >
              <Scan className="w-6 h-6 text-blue-500" />
              <span className="text-sm">Scan Tag</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 space-y-2"
            >
              <Camera className="w-6 h-6 text-green-500" />
              <span className="text-sm">Take Photo</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 space-y-2"
            >
              <Mic className="w-6 h-6 text-purple-500" />
              <span className="text-sm">Voice Note</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 space-y-2"
            >
              <Save className="w-6 h-6 text-red-500" />
              <span className="text-sm">Quick Save</span>
            </Button>
          </div>
        </Card>

        {/* Offline Data */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Offline Data</h3>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
          </div>
          <div className="space-y-4">
            {offlineData.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{item.animal}</p>
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${
                    item.status === 'Synced'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status === 'Synced' ? (
                      <Wifi className="w-3 h-3 mr-1" />
                    ) : (
                      <WifiOff className="w-3 h-3 mr-1" />
                    )}
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Data</p>
                    <p className="text-sm font-medium text-gray-900">{item.data}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <p className="text-sm font-medium text-gray-900">{item.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Photo Documentation */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Photo Documentation</h3>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload All
            </Button>
          </div>
          <div className="space-y-4">
            {recentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="font-medium text-gray-900">{photo.animal}</p>
                      <p className="text-sm text-gray-500">{photo.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    photo.status === 'Uploaded'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {photo.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Notes</p>
                    <p className="text-sm font-medium text-gray-900">{photo.notes}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <p className="text-sm font-medium text-gray-900">{photo.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Voice Notes */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Voice Notes</h3>
            <Button variant="outline" size="sm">
              <Mic className="w-4 h-4 mr-2" />
              Record New
            </Button>
          </div>
          <div className="space-y-4">
            {voiceNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">{note.animal}</p>
                      <p className="text-sm text-gray-500">{note.notes}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    note.status === 'Transcribed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {note.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{note.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timestamp</p>
                    <p className="text-sm font-medium text-gray-900">{note.timestamp}</p>
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