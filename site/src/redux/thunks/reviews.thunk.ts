import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewsAPI } from '@/api';
import { IReview } from '@/types/types';

export const requestReviews = createAsyncThunk(
  'reviews/fetchAllReviews',
  async () => reviewsAPI.getReviews()
)

export const postReview = createAsyncThunk(
  'reviews/postNewReview',
  async (review: IReview) => reviewsAPI.postReview(review)
)