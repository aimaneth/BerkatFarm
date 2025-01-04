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
  selectedCount: number;
  onAssignTask: () => void;
  onAssignShift: () => void;
  onUpdatePermissions: () => void;
  onSendMessage: () => void;
  onExport: () => void;
  onPrint: () => void;
  onClearSelection: () => void;
}

export function BulkActions({
  selectedCount,
  onAssignTask,
  onAssignShift,
  onUpdatePermissions,
  onSendMessage,
  onExport,
  onPrint,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-200 ease-in-out z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedCount} member{selectedCount > 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear selection
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onAssignTask}
              className="flex items-center bg-white"
            >
              <TasksIcon className="h-4 w-4 mr-2" />
              Assign Task
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onAssignShift}
              className="flex items-center bg-white"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Assign Shift
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onUpdatePermissions}
              className="flex items-center bg-white"
            >
              <ShieldIcon className="h-4 w-4 mr-2" />
              Update Permissions
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onSendMessage}
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