import mongoose, { Document, Model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  metaDescription?: string;
}

const PostSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  author: { type: String, default: 'Kenya Money & Power' },
  metaDescription: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
