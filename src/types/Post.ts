interface PostType {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id: string;
  author?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Legacy fields for backward compatibility
  details?: string;
  date?: string;
}

export default PostType;
