import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(Netlify.env.get('MONGO_URL'));
}

const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({
  title: String,
  content: String,
  author: String,
}));

export default async (req) => {
  try {
    await connectDB();

    const pathname = new URL(req.url).pathname;
    const method = req.method;

    if (method === 'GET' && pathname === '/api/blog/all') {
      const blogs = await Blog.find();
      return Response.json(blogs);
    }

    if (method === 'POST' && pathname === '/api/blog/add') {
      const body = await req.json();
      const blog = await Blog.create(body);
      return Response.json(blog, { status: 201 });
    }

    if (method === 'DELETE' && pathname.startsWith('/api/blog/delete/')) {
      const id = pathname.split('/api/blog/delete/')[1];
      await Blog.findByIdAndDelete(id);
      return Response.json({ message: 'Deleted' });
    }

    if (method === 'GET') {
      const id = pathname.split('/api/blog/')[1];
      const blog = await Blog.findById(id);
      if (!blog) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json(blog);
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = {
  path: '/api/blog/*',
};
