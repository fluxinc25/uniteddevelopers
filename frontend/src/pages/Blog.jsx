import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable Web Applications',
    excerpt: 'Learn the best practices for creating web applications that can handle growth and traffic spikes.',
    date: 'July 15, 2026',
    readTime: '5 min read',
    category: 'Development',
  },
  {
    id: 2,
    title: 'UI/UX Design Trends for 2026',
    excerpt: 'Explore the latest design trends that are shaping the future of digital experiences.',
    date: 'July 10, 2026',
    readTime: '4 min read',
    category: 'Design',
  },
  {
    id: 3,
    title: 'Why Your Business Needs a Mobile App',
    excerpt: 'Discover how mobile applications can transform your business and improve customer engagement.',
    date: 'July 5, 2026',
    readTime: '6 min read',
    category: 'Business',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-gray-600 mb-12 text-lg">Insights, tutorials, and updates from the United Developers team.</p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;