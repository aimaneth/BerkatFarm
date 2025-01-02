import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Calendar as CalendarIcon,
  ClipboardList as TasksIcon,
  Download as DownloadIcon,
  Mail as MailIcon,
  Printer as PrinterIcon,
  Shield as ShieldIcon,
  UserPlus as UserPlusIcon,
} from 'lucide-react';

interface BulkActionsProps {
  selectedMembers: number[];
  onAssignTask: (memberIds: number[]) => void;
  onAssignShift: (memberIds: number[]) => void;
  onUpdatePermissions: (memberIds: number[]) => void;
  onSendMessage: (memberIds: number[]) => void;
  onExport: () => void;
  onPrint: () => void;
}

export function BulkActions({
  selectedMembers,
  onAssignTask,
  onAssignShift,
  onUpdatePermissions,
  onSendMessage,
  onExport,
  onPrint,
}: BulkActionsProps) {
  const [isActionsVisible, setIsActionsVisible] = useState(false);

  if (selectedMembers.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-200 ease-in-out z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAssignTask(selectedMembers)}
              className="flex items-center bg-white"
            >
              <TasksIcon className="h-4 w-4 mr-2" />
              Assign Task
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onAssignShift(selectedMembers)}
              className="flex items-center bg-white"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Assign Shift
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdatePermissions(selectedMembers)}
              className="flex items-center bg-white"
            >
              <ShieldIcon className="h-4 w-4 mr-2" />
              Update Permissions
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendMessage(selectedMembers)}
              className="flex items-center bg-white"
            >
              <MailIcon className="h-4 w-4 mr-2" />
              Send Message
            </Button>

            <div className="border-l border-gray-200 h-6 mx-2" />

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center bg-white"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onPrint}
              className="flex items-center bg-white"
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 