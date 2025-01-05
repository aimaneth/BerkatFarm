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
import { FileSpreadsheet, FileUp, Download, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataImportModal({ isOpen, onClose }: DataImportModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string[][]>([]);
  const [error, setError] = React.useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && 
          !selectedFile.type.includes('spreadsheet') &&
          !selectedFile.type.includes('excel')) {
        setError('Please upload a CSV or Excel file');
        return;
      }
      setFile(selectedFile);
      setError('');
      
      // Preview CSV content (simplified for demo)
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').slice(0, 5); // Preview first 5 lines
        const data = lines.map(line => line.split(','));
        setPreview(data);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    // Implement actual import logic here
    console.log('Importing file:', file.name);
    onClose();
  };

  const handleDownloadTemplate = () => {
    // Implement template download logic
    console.log('Downloading template');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Animals
          </DialogTitle>
          <DialogDescription>
            Import multiple animals using a CSV or Excel file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={handleDownloadTemplate}>
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-medium">Download Template</h3>
                <p className="text-sm text-muted-foreground">
                  Get the correct format for importing animals
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload File</label>
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {preview.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preview</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {preview.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-2 text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button 
            onClick={handleImport} 
            disabled={!file} 
            className="w-[200px]"
          >
            <FileUp className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="outline" onClick={onClose} className="w-[200px]">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 