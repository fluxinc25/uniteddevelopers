import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const token = localStorage.getItem('ud_token');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'website',
    status: 'active',
    featured: false,
    techStack: '',
    features: '',
    liveUrl: '',
    githubUrl: '',
    playStoreUrl: '',
    rating: '5.0',
    order: '0',
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          shortDescription: data.shortDescription || '',
          category: data.category || 'website',
          status: data.status || 'active',
          featured: data.featured || false,
          techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : '',
          features: Array.isArray(data.features) ? data.features.join('\n') : '',
          liveUrl: data.liveUrl || '',
          githubUrl: data.githubUrl || '',
          playStoreUrl: data.playStoreUrl || '',
          rating: String(data.rating || '5.0'),
          order: String(data.order || '0'),
        });
      } catch (err) {
        alert('Failed to load project');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('slug', form.slug);
      data.append('description', form.description);
      data.append('shortDescription', form.shortDescription);
      data.append('category', form.category);
      data.append('status', form.status);
      data.append('featured', form.featured);
      data.append('liveUrl', form.liveUrl);
      data.append('githubUrl', form.githubUrl);
      data.append('playStoreUrl', form.playStoreUrl);
      data.append('rating', form.rating);
      data.append('order', form.order);
      data.append('techStack', JSON.stringify(form.techStack.split(',').map((t) => t.trim()).filter(Boolean)));
      data.append('features', JSON.stringify(form.features.split('\n').map((f) => f.trim()).filter(Boolean)));

      files.forEach((file) => data.append('images', file));

      const url = isEdit
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`;

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to save project');
      }

      navigate('/admin');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 pt-20 pb-20">
      <div className="section-padding max-w-3xl mx-auto">
        <button onClick={() => navigate('/admin')} className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-3xl bg-white border border-surface-200/80 shadow-soft-lg">
          <h1 className="text-2xl font-bold text-surface-900 mb-6">
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Project Title" name="title" value={form.title} onChange={handleChange} required />
              <Input label="URL Slug" name="slug" value={form.slug} onChange={handleChange} required placeholder="my-project" />
            </div>

            <Input label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} required placeholder="Brief summary for cards (1-2 sentences)" />

            <TextArea label="Full Description" name="description" value={form.description} onChange={handleChange} required rows={4} />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-surface-200 rounded-xl text-surface-800 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
                  <option value="website">Website</option>
                  <option value="android">Mobile (Android)</option>
                  <option value="uiux">UI/UX</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="dashboard">Dashboard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-surface-200 rounded-xl text-surface-800 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
                  <option value="active">Active</option>
                  <option value="coming-soon">Coming Soon</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <TextArea label="Tech Stack (comma separated)" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB, Tailwind CSS" rows={2} />

            <TextArea label="Features (one per line)" name="features" value={form.features} onChange={handleChange} placeholder="Real-time data sync&#10;User authentication&#10;Responsive design" rows={4} />

            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
              <Input label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Play Store URL" name="playStoreUrl" value={form.playStoreUrl} onChange={handleChange} placeholder="https://play.google.com/..." />
              <Input label="Order" name="order" type="number" value={form.order} onChange={handleChange} placeholder="0" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Rating" name="rating" value={form.rating} onChange={handleChange} placeholder="5.0" />
              <div className="flex items-center gap-3 h-full pt-6">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                <label className="text-sm text-surface-700 font-medium">Featured Project</label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                {isEdit ? 'Replace Images (optional)' : 'Project Images *'}
              </label>
              <div className="border-2 border-dashed border-surface-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files))} className="hidden" id="project-images" />
                <label htmlFor="project-images" className="cursor-pointer flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-surface-400" />
                  <span className="text-sm text-surface-500">
                    {files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload images'}
                  </span>
                </label>
              </div>
              {!isEdit && <p className="text-xs text-surface-400 mt-1">At least one image is required for new projects</p>}
            </div>

            <Button type="submit" loading={saving} className="w-full justify-center">
              <Plus className="w-4 h-4" /> {isEdit ? 'Update Project' : 'Create Project'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProjectForm;