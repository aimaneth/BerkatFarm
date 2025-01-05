'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  FileText,
  Download,
  Table,
  FileJson,
  Files,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  animals: Array<{
    tag: string;
    breed: string;
  }>;
}

export function ExportModal({ isOpen, onClose, animals }: ExportModalProps) {
  const handleExport = (format: string) => {
    // Implement export logic here
    console.log(`Exporting ${animals.length} animals in ${format} format`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Data
          </DialogTitle>
          <DialogDescription>
            Export data for {animals.length} animal{animals.length !== 1 ? 's' : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleExport('pdf')}>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-medium">PDF Report</h3>
                <p className="text-sm text-muted-foreground">Detailed report with all information</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleExport('csv')}>
            <div className="flex items-center gap-3">
              <Files className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-medium">CSV Export</h3>
                <p className="text-sm text-muted-foreground">Spreadsheet-friendly format</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleExport('json')}>
            <div className="flex items-center gap-3">
              <FileJson className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-medium">JSON Export</h3>
                <p className="text-sm text-muted-foreground">Raw data format</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button variant="outline" onClick={onClose} className="w-[200px]">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 