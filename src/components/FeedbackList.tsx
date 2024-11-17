import React from 'react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Star } from 'lucide-react';

interface Feedback {
  _id: string;
  timestamp: string;
  rate: number;
  category: string;
  comment: string;
  user_phone: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">משובים אחרונים</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < feedback.rate ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={i < feedback.rate ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 mr-2">
                  {format(new Date(feedback.timestamp), 'dd/MM/yyyy HH:mm', { locale: he })}
                </span>
              </div>
              <span className="text-sm text-gray-500">{feedback.user_phone}</span>
            </div>
            {feedback.comment && (
              <p className="mt-2 text-gray-600">{feedback.comment}</p>
            )}
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {feedback.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}