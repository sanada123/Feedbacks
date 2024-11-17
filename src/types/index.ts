export interface Feedback {
  _id: string;
  store_id: string;
  timestamp: string;
  rate: number;
  category: string;
  comment: string;
  user_phone: string;
  doc_id: string;
}

export interface Stats {
  totalCount: number;
  averageRating: number;
  ratingDistribution: { _id: number; count: number }[];
}