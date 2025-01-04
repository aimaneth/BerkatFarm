import { LucideIcon } from 'lucide-react';

interface QuickAction {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  hoverColor: string;
  ringColor: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: QuickAction) => void;
}

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick?.(action)}
          className={`
            ${action.bgColor} 
            ${action.hoverColor} 
            inline-flex items-center justify-center px-4 py-3 
            border border-transparent text-sm font-medium rounded-md 
            text-white shadow-sm focus:outline-none focus:ring-2 
            focus:ring-offset-2 ${action.ringColor} transition-colors
          `}
        >
          <action.icon className="h-5 w-5 mr-2" />
          {action.name}
        </button>
      ))}
    </div>
  );
} 