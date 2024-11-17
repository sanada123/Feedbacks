import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Feedback, Stats } from '../types';
import { API_URL } from '../config';

export function useFeedbackData() {
  const { data: feedbacks, isLoading: isLoadingFeedbacks } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async (): Promise<Feedback[]> => {
      const { data } = await axios.get(`${API_URL}/api/feedbacks`);
      return data;
    }
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<Stats> => {
      const { data } = await axios.get(`${API_URL}/api/stats`);
      return data;
    }
  });

  return {
    feedbacks,
    stats,
    isLoading: isLoadingFeedbacks || isLoadingStats
  };
}