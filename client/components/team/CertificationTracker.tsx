import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { addDays, format, differenceInDays, isBefore } from 'date-fns';

interface Certification {
  id: string;
  name: string;
  issuedDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  certificateNumber: string;
  status: 'valid' | 'expiring' | 'expired';
  documentUrl?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  certifications: Certification[];
}

const mockTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    role: 'Senior Veterinarian',
    certifications: [
      {
        id: 'cert1',
        name: 'Veterinary License',
        issuedDate: new Date(2023, 1, 15),
        expiryDate: new Date(2024, 1, 15),
        issuingAuthority: 'State Veterinary Board',
        certificateNumber: 'VET-2023-001',
        status: 'valid',
        documentUrl: '/docs/vet-license-001.pdf'
      },
      {
        id: 'cert2',
        name: 'Emergency Animal Care',
        issuedDate: new Date(2023, 6, 1),
        expiryDate: addDays(new Date(), 25),
        issuingAuthority: 'Animal Emergency Care Institute',
        certificateNumber: 'EAC-2023-123',
        status: 'expiring',
        documentUrl: '/docs/emergency-cert-123.pdf'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Animal Care Specialist',
    certifications: [
      {
        id: 'cert3',
        name: 'Animal Handling',
        issuedDate: new Date(2023, 3, 10),
        expiryDate: new Date(2024, 3, 10),
        issuingAuthority: 'Animal Care Association',
        certificateNumber: 'AH-2023-456',
        status: 'valid',
        documentUrl: '/docs/animal-handling-456.pdf'
      },
      {
        id: 'cert4',
        name: 'First Aid for Animals',
        issuedDate: new Date(2023, 1, 1),
        expiryDate: new Date(2023, 12, 31),
        issuingAuthority: 'Pet Emergency Institute',
        certificateNumber: 'FA-2023-789',
        status: 'expired',
        documentUrl: '/docs/first-aid-789.pdf'
      }
    ]
  }
];

const statusColors = {
  valid: 'bg-green-100 text-green-800',
  expiring: 'bg-yellow-100 text-yellow-800',
  expired: 'bg-red-100 text-red-800'
};

const statusIcons = {
  valid: <CheckCircle2 className="h-4 w-4" />,
  expiring: <Clock className="h-4 w-4" />,
  expired: <AlertTriangle className="h-4 w-4" />
};

export function CertificationTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'expiring' | 'expired'>('all');

  const filteredData = mockTeamData
    .map(member => ({
      ...member,
      certifications: member.certifications
        .filter(cert => {
          const matchesSearch = 
            cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesStatus = 
            statusFilter === 'all' || cert.status === statusFilter;

          return matchesSearch && matchesStatus;
        })
    }))
    .filter(member => member.certifications.length > 0);

  const getExpiryInfo = (expiryDate: Date) => {
    const daysUntilExpiry = differenceInDays(expiryDate, new Date());
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry <= 30) return `Expires in ${daysUntilExpiry} days`;
    return `Expires ${format(expiryDate, 'MMM d, yyyy')}`;
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Certification Tracker</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="valid">Valid</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Certifications Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Team Member</TableHead>
                <TableHead className="min-w-[200px]">Certification</TableHead>
                <TableHead className="min-w-[150px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Issued Date</TableHead>
                <TableHead className="min-w-[150px]">Expiry Date</TableHead>
                <TableHead className="min-w-[150px]">Certificate #</TableHead>
                <TableHead className="min-w-[100px]">Document</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(member => (
                member.certifications.map(cert => (
                  <TableRow key={cert.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.issuingAuthority}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`flex items-center gap-1 ${statusColors[cert.status]}`}
                      >
                        {statusIcons[cert.status]}
                        <span className="capitalize">{cert.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(cert.issuedDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {format(cert.expiryDate, 'MMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getExpiryInfo(cert.expiryDate)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {cert.certificateNumber}
                    </TableCell>
                    <TableCell>
                      {cert.documentUrl && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View Document</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="text-green-800">Valid Certifications</div>
              <Badge variant="outline" className={statusColors.valid}>
                {mockTeamData.reduce((acc, member) => 
                  acc + member.certifications.filter(c => c.status === 'valid').length, 0
                )}
              </Badge>
            </div>
          </Card>
          <Card className="p-4 bg-yellow-50">
            <div className="flex items-center justify-between">
              <div className="text-yellow-800">Expiring Soon</div>
              <Badge variant="outline" className={statusColors.expiring}>
                {mockTeamData.reduce((acc, member) => 
                  acc + member.certifications.filter(c => c.status === 'expiring').length, 0
                )}
              </Badge>
            </div>
          </Card>
          <Card className="p-4 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="text-red-800">Expired</div>
              <Badge variant="outline" className={statusColors.expired}>
                {mockTeamData.reduce((acc, member) => 
                  acc + member.certifications.filter(c => c.status === 'expired').length, 0
                )}
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
} 