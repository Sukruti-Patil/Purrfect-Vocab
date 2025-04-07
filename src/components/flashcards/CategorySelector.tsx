
import React from 'react';
import { cn } from '@/lib/utils';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "flex items-center gap-2 p-3 rounded-lg border transition-all",
              selectedCategory === category.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-muted"
            )}
          >
            <span 
              className={cn(
                "text-lg",
                category.color
              )}
            >
              {category.icon}
            </span>
            <span className="font-medium text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
