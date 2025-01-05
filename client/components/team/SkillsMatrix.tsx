import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-5 scale
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: Skill[];
}

const skillCategories = [
  'Animal Care',
  'Veterinary',
  'Farm Operations',
  'Safety & Emergency',
  'Equipment Operation',
];

const skillsList = [
  // Animal Care Skills
  { name: 'Feeding Management', category: 'Animal Care' },
  { name: 'Health Monitoring', category: 'Animal Care' },
  { name: 'Behavior Assessment', category: 'Animal Care' },
  { name: 'Growth Tracking', category: 'Animal Care' },
  
  // Veterinary Skills
  { name: 'Disease Diagnosis', category: 'Veterinary' },
  { name: 'Emergency Treatment', category: 'Veterinary' },
  { name: 'Vaccination', category: 'Veterinary' },
  { name: 'Surgery', category: 'Veterinary' },
  
  // Farm Operations
  { name: 'Inventory Management', category: 'Farm Operations' },
  { name: 'Feed Storage', category: 'Farm Operations' },
  { name: 'Waste Management', category: 'Farm Operations' },
  { name: 'Record Keeping', category: 'Farm Operations' },
  
  // Safety & Emergency
  { name: 'First Aid', category: 'Safety & Emergency' },
  { name: 'Emergency Response', category: 'Safety & Emergency' },
  { name: 'Biosecurity', category: 'Safety & Emergency' },
  { name: 'Risk Assessment', category: 'Safety & Emergency' },
  
  // Equipment Operation
  { name: 'Feeding Equipment', category: 'Equipment Operation' },
  { name: 'Medical Equipment', category: 'Equipment Operation' },
  { name: 'Monitoring Systems', category: 'Equipment Operation' },
  { name: 'Maintenance Tools', category: 'Equipment Operation' },
];

const mockTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    role: 'Senior Veterinarian',
    skills: skillsList.map(skill => ({
      name: skill.name,
      category: skill.category,
      proficiency: skill.category === 'Veterinary' ? 5 : 
                  skill.category === 'Animal Care' ? 4 :
                  Math.floor(Math.random() * 3) + 2
    }))
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Animal Care Specialist',
    skills: skillsList.map(skill => ({
      name: skill.name,
      category: skill.category,
      proficiency: skill.category === 'Animal Care' ? 5 :
                  skill.category === 'Farm Operations' ? 4 :
                  Math.floor(Math.random() * 3) + 1
    }))
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Farm Operations Manager',
    skills: skillsList.map(skill => ({
      name: skill.name,
      category: skill.category,
      proficiency: skill.category === 'Farm Operations' ? 5 :
                  skill.category === 'Equipment Operation' ? 4 :
                  Math.floor(Math.random() * 3) + 1
    }))
  }
];

function ProficiencyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= level) {
          return <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
        } else if (star === Math.ceil(level) && !Number.isInteger(level)) {
          return <StarHalf key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
        }
        return <StarOff key={star} className="h-4 w-4 text-gray-300" />;
      })}
    </div>
  );
}

export function SkillsMatrix() {
  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Team Skills Matrix</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Proficiency Level:</span>
            <div className="flex items-center space-x-0.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">1-5</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Team Member</TableHead>
                {skillCategories.map(category => (
                  <TableHead key={category} className="min-w-[200px]">
                    {category}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeamData.map(member => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </div>
                  </TableCell>
                  {skillCategories.map(category => (
                    <TableCell key={category}>
                      <div className="space-y-2">
                        {member.skills
                          .filter(skill => skill.category === category)
                          .map(skill => (
                            <div key={skill.name} className="flex flex-col space-y-1">
                              <span className="text-sm text-gray-600">{skill.name}</span>
                              <ProficiencyStars level={skill.proficiency} />
                            </div>
                          ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Category Legend */}
        <div className="mt-4 border-t pt-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Skill Categories:</div>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map(category => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 