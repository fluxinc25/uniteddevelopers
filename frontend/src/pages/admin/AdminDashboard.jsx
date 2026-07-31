import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FolderOpen, Mail, LogOut, Plus, Trash2, ExternalLink, Pencil, Eye, EyeOff
} from 'lucide-react';
import { projectAPI } from '../../api/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('ud_token');

  useEffect(() => {
    if (!token) return navigate('/admin/login');
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'projects') {
        const res = await projectAPI.getAll();
        setProjects(res.data);
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleToggleRead = async (id, currentRead) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.map((m) => m._id === id ? { ...m, read: !currentRead } : m));
    } catch (err) {
      alert('Failed to update');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ud_token');
    navigate('/admin/login');
  };

  const categoryLabels = {
    website: 'Website',
    android: 'Mobile',
    uiux: 'UI/UX',
    fullstack: 'Full Stack',
    ecommerce: 'E-Commerce',
    dashboard: 'Dashboard'
  };

  return (
    <div className="min-h-screen bg-surface-50 pt-20">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-2">
              <div className="p-4 rounded-2xl bg-white border border-surface-200/80 shadow-soft mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-surface-800 text-sm">Admin Panel</div>
                    <div className="text-xs text-surface-400">United Developers</div>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                <button onClick={() => setTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === 'projects' ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-100'}`}>
                  <FolderOpen className="w-4 h-4" /> Projects
                </button>
                <button onClick={() => setTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === 'messages' ? 'bg-primary-50 text-primary-600' : 'text-surface-600 hover:bg-surface-100'}`}>
                  <Mail className="w-4 h-4" /> Messages
                  {messages.filter(m => !m.read).length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {messages.filter(m => !m.read).length}
                    </span>
                  )}
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {tab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-surface-900">Projects ({projects.length})</h2>
                  <Link to="/admin/projects/new" className="btn-primary text-sm inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-medium hover:shadow-glow transition-all">
                    <Plus className="w-4 h-4" /> Add Project
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center py-20 text-surface-400">Loading...</div>
                ) : (
                  <div className="bg-white rounded-2xl border border-surface-200/80 shadow-soft overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-surface-200 bg-surface-50">
                            <th className="text-left px-6 py-4 font-semibold text-surface-700">Project</th>
                            <th className="text-left px-6 py-4 font-semibold text-surface-700">Category</th>
                            <th className="text-left px-6 py-4 font-semibold text-surface-700">Status</th>
                            <th className="text-right px-6 py-4 font-semibold text-surface-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project) => (
                            <tr key={project._id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50/50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {project.thumbnail && (
                                    <img src={project.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                  )}
                                  <div>
                                    <div className="font-medium text-surface-800">{project.title}</div>
                                    <div className="text-xs text-surface-400">{project.slug}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-surface-600">{categoryLabels[project.category] || project.category}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  project.status === 'active' ? 'bg-green-50 text-green-700' : 
                                  project.status === 'coming-soon' ? 'bg-amber-50 text-amber-700' : 
                                  'bg-surface-100 text-surface-600'
                                }`}>
                                  {project.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Link to={`/projects/${project.slug || project._id}`} target="_blank" className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                  </Link>
                                  <Link to={`/admin/projects/edit/${project._id}`} className="p-2 rounded-lg hover:bg-primary-50 text-primary-600 transition-colors">
                                    <Pencil className="w-4 h-4" />
                                  </Link>
                                  <button onClick={() => handleDeleteProject(project._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold text-surface-900 mb-6">Messages ({messages.length})</h2>
                {loading ? (
                  <div className="text-center py-20 text-surface-400">Loading...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-20 text-surface-400">No messages yet</div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg._id} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className={`p-6 rounded-2xl bg-white border shadow-soft ${msg.read ? 'border-surface-200/80' : 'border-primary-300'}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${msg.read ? 'bg-surface-300' : 'bg-primary-500'}`} />
                            <div>
                              <h3 className="font-semibold text-surface-800">{msg.name}</h3>
                              <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline">{msg.email}</a>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-surface-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            <button 
                              onClick={() => handleToggleRead(msg._id, msg.read)} 
                              className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors"
                              title={msg.read ? 'Mark as unread' : 'Mark as read'}
                            >
                              {msg.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button onClick={() => handleDeleteMessage(msg._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-surface-700 mb-2 flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            msg.source === 'hire' ? 'bg-purple-50 text-purple-600' :
                            msg.source === 'collaboration' ? 'bg-blue-50 text-blue-600' :
                            'bg-surface-100 text-surface-600'
                          }`}>
                            {msg.source || 'contact'}
                          </span>
                          {msg.subject}
                        </div>
                        <p className="text-sm text-surface-500 leading-relaxed bg-surface-50 p-3 rounded-xl">{msg.message}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;