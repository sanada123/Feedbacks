import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const feedbackSchema = new mongoose.Schema({
  store_id: String,
  timestamp: Date,
  rate: Number,
  category: String,
  comment: String,
  user_phone: String,
  doc_id: String
}, { collection: 'feedbacks' });

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const [totalCount, averageRating, ratingDistribution] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.aggregate([{ $group: { _id: null, avg: { $avg: '$rate' } } }]),
      Feedback.aggregate([
        { $group: { _id: '$rate', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      totalCount,
      averageRating: averageRating[0]?.avg || 0,
      ratingDistribution
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));