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
import { Filter, Beef, Footprints, Bird } from 'lucide-react';

interface CategoryFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: Array<{
    id: string;
    name: string;
    count: number;
    trend: string;
  }>;
}

export function CategoryFilter({ isOpen, onClose, selectedCategory, onSelectCategory, categories }: CategoryFilterProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter by Category
          </DialogTitle>
          <DialogDescription>
            Select a category to filter the livestock list
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Card 
            className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
              selectedCategory === 'all' ? 'bg-accent' : ''
            }`}
            onClick={() => {
              onSelectCategory('all');
              onClose();
            }}
          >
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-medium">All Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Show all animals ({categories.reduce((acc, cat) => acc + cat.count, 0)})
                </p>
              </div>
            </div>
          </Card>

          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                selectedCategory === category.id.toLowerCase() ? 'bg-accent' : ''
              }`}
              onClick={() => {
                onSelectCategory(category.id.toLowerCase());
                onClose();
              }}
            >
              <div className="flex items-center gap-3">
                {category.id === 'cattle' ? (
                  <Beef className="h-5 w-5" />
                ) : category.id === 'sheep' ? (
                  <Footprints className="h-5 w-5" />
                ) : (
                  <Bird className="h-5 w-5" />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} animals • {category.trend}
                  </p>
                </div>
              </div>
            </Card>
          ))}
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