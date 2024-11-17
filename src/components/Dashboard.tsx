import React from 'react';
import { Star, MessageSquare, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StatsCard } from './StatsCard';
import { RatingChart } from './RatingChart';
import { FeedbackList } from './FeedbackList';

const API_URL = 'http://localhost:5000';

export default function Dashboard() {
  const { data: feedbacks, isLoading: isLoadingFeedbacks } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/feedbacks`);
      return data;
    }
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/api/stats`);
      return data;
    }
  });

  if (isLoadingFeedbacks || isLoadingStats || !stats || !feedbacks) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">לוח בקרה למשובים</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="דירוג ממוצע"
          value={stats.averageRating.toFixed(1)}
          icon={Star}
          color="yellow"
        />
        <StatsCard
          title="סך הכל משובים"
          value={stats.totalCount}
          icon={MessageSquare}
          color="blue"
        />
        <StatsCard
          title="משוב אחרון"
          value={format(new Date(feedbacks[0].timestamp), 'dd/MM/yyyy', { locale: he })}
          icon={Calendar}
          color="green"
        />
      </div>

      <div className="space-y-8">
        <RatingChart data={stats.ratingDistribution} />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  );
}