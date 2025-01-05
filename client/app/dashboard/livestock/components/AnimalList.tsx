import { Animal } from '../types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  HeartPulse,
  Baby,
  LineChart,
  Leaf,
  Scale,
  Move,
  ShieldAlert,
  History,
  Pencil,
  Trash2,
  MoreVertical,
  DollarSign,
} from 'lucide-react';

interface AnimalListProps {
  data: Animal[];
  onSelect: (animal: Animal | null) => void;
  onSelectMultiple: (animals: Animal[]) => void;
  selected: Animal[];
}

export function AnimalList({ data, onSelect, onSelectMultiple, selected }: AnimalListProps) {
  const handleSelectAll = (checked: boolean) => {
    onSelectMultiple(checked ? data : []);
  };

  const handleSelect = (animal: Animal, checked: boolean) => {
    if (checked) {
      onSelectMultiple([...selected, animal]);
    } else {
      onSelectMultiple(selected.filter(a => a.id !== animal.id));
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.length === data.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-muted-foreground">
            {selected.length} selected
          </span>
        </div>

        <div className="space-y-2">
          {data.map(animal => (
            <div
              key={animal.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selected.some(a => a.id === animal.id)}
                  onChange={(e) => handleSelect(animal, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <div>
                  <p className="font-medium">{animal.tag}</p>
                  <p className="text-sm text-muted-foreground">{animal.breed}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Health Records"
                >
                  <HeartPulse className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Breeding Records"
                >
                  <Baby className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Production Records"
                >
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Feed Records"
                >
                  <Leaf className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Financial Records"
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Weight Records"
                >
                  <Scale className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelect(animal)}
                  title="Movement Records"
                >
                  <Move className="h-4 w-4" />
                </Button>
                {animal.status !== 'healthy' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSelect(animal)}
                    title="Quarantine Records"
                    className="text-yellow-600"
                  >
                    <ShieldAlert className="h-4 w-4" />
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 border shadow-md">
                    <DropdownMenuItem onClick={() => onSelect(animal)}>
                      <History className="h-4 w-4 mr-2" />
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSelect(animal)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Animal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSelect(animal)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Animal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 