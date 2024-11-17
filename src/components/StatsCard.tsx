import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'yellow' | 'blue' | 'green';
}

const colorClasses = {
  yellow: 'text-yellow-500',
  blue: 'text-blue-500',
  green: 'text-green-500'
} as const;

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${colorClasses[color]} bg-opacity-10`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="mr-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}