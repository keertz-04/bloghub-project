import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(Netlify.env.get('MONGO_URL'));
}

const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

export default async (req) => {
  try {
    await connectDB();

    const pathname = new URL(req.url).pathname;
    const method = req.method;

    if (method === 'POST' && pathname === '/api/admin/register') {
      const { name, email, password } = await req.json();
      const hashed = await bcrypt.hash(password, 10);
      await Admin.create({ name, email, password: hashed });
      return Response.json({ message: 'Registered Successfully' }, { status: 201 });
    }

    if (method === 'POST' && pathname === '/api/admin/login') {
      const { email, password } = await req.json();
      const admin = await Admin.findOne({ email });
      if (!admin) return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      const token = jwt.sign({ id: admin._id }, Netlify.env.get('JWT_SECRET'));
      return Response.json({ token });
    }

    return Response.json({ error: 'Not found' }, { status: 404 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = {
  path: '/api/admin/*',
};
