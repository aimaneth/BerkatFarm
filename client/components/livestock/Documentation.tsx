import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Syringe,
  Stethoscope,
  Shield,
  Upload,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const vaccinationRecords = [
  {
    id: 1,
    tag: 'COW-123',
    vaccine: 'FMD Vaccine',
    date: '2024-01-15',
    nextDue: '2024-07-15',
    administrator: 'Dr. Smith',
    status: 'Completed',
  },
  {
    id: 2,
    tag: 'COW-456',
    vaccine: 'Brucellosis',
    date: '2024-01-20',
    nextDue: '2024-07-20',
    administrator: 'Dr. Johnson',
    status: 'Scheduled',
  },
];

const medicalHistory = [
  {
    id: 1,
    tag: 'COW-789',
    condition: 'Respiratory Infection',
    diagnosis: '2024-01-05',
    treatment: 'Antibiotics',
    duration: '7 days',
    outcome: 'Recovered',
    veterinarian: 'Dr. Wilson',
  },
  {
    id: 2,
    tag: 'COW-234',
    condition: 'Hoof Problem',
    diagnosis: '2024-01-12',
    treatment: 'Trimming & Medication',
    duration: '5 days',
    outcome: 'In Treatment',
    veterinarian: 'Dr. Brown',
  },
];

const certifications = [
  {
    id: 1,
    type: 'Organic Certification',
    issueDate: '2023-12-01',
    expiryDate: '2024-12-01',
    status: 'Active',
    issuingBody: 'Organic Standards Board',
    documentRef: 'ORG-2023-001',
  },
  {
    id: 2,
    type: 'Health & Safety Compliance',
    issueDate: '2023-11-15',
    expiryDate: '2024-11-15',
    status: 'Active',
    issuingBody: 'Agricultural Health Board',
    documentRef: 'HSC-2023-089',
  },
];

export function Documentation() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vaccination Records */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Vaccination Records</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {vaccinationRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Syringe className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{record.tag}</p>
                      <p className="text-sm text-gray-500">{record.vaccine}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">{record.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Due</p>
                    <p className="text-sm font-medium text-gray-900">{record.nextDue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Administrator</p>
                    <p className="text-sm font-medium text-gray-900">{record.administrator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Medical History */}
        <Card className="p-4 sm:p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View All Records
            </Button>
          </div>
          <div className="space-y-4">
            {medicalHistory.map((record) => (
              <div
                key={record.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">{record.tag}</p>
                      <p className="text-sm text-gray-500">{record.condition}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.outcome === 'Recovered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {record.outcome}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Treatment</p>
                    <p className="text-sm font-medium text-gray-900">{record.treatment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{record.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Diagnosis Date</p>
                    <p className="text-sm font-medium text-gray-900">{record.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Veterinarian</p>
                    <p className="text-sm font-medium text-gray-900">{record.veterinarian}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-4 sm:p-6 bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Certifications & Documents</h3>
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Manage Documents
            </Button>
          </div>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-gray-900">{cert.type}</p>
                      <p className="text-sm text-gray-500">Ref: {cert.documentRef}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    cert.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Issue Date</p>
                    <p className="text-sm font-medium text-gray-900">{cert.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expiry Date</p>
                    <p className="text-sm font-medium text-gray-900">{cert.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Issuing Body</p>
                    <p className="text-sm font-medium text-gray-900">{cert.issuingBody}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 