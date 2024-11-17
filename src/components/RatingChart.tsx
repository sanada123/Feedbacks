import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingDistribution {
  _id: number;
  count: number;
}

interface RatingChartProps {
  data: RatingDistribution[];
}

export function RatingChart({ data }: RatingChartProps) {
  const chartData = data.map(item => ({
    rating: `${item._id} כוכבים`,
    count: item.count
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">התפלגות דירוגים</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="rating" type="category" />
            <Tooltip />
            <Bar dataKey="count" fill="#FCD34D" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}