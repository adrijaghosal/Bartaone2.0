import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiSave,
  FiEye,
  FiArrowLeft,
  FiImage,
  FiTag,
  FiCalendar,
  FiClock,
  FiSettings,
  FiHelpCircle,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiListOrdered,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiCode,
  FiQuote,
  FiMaximize,
  FiMinimize,
  FiUpload,
  FiX
} from 'react-icons/fi';
import { useArticles } from '../../../hooks/useArticles';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Toast from '../../common/Toast';
import PublishButton from './PublishButton';
import ArticleStatus from './ArticleStatus';
import Skeleton from '../../common/Skeleton';

const ArticleEditor = ({ mode = 'create', className = '' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getArticle, 
    createArticle, 
    updateArticle, 
    loading, 
    error 
  } = useArticles();

  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: '',
    tags: [],
    status: 'draft',
    scheduledDate: null,
    readTime: 0,
  });

  const [originalArticle, setOriginalArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [tagInput, setTagInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [showSettings, setShowSettings] = useState(false);
  
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  // Fetch article if editing
  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchArticle();
    }
  }, [id, mode]);

  const fetchArticle = async () => {
    try {
      const data = await getArticle(id);
      setArticle(data);
      setOriginalArticle(data);
      calculateStats(data.content);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to load article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  // Auto-save
  useEffect(() => {
    if (isEditing && mode === 'edit') {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [article]);

  const calculateStats = (content) => {
    const words = content?.split(/\s+/).filter(w => w.length > 0).length || 0;
    const chars = content?.length || 0;
    setWordCount(words);
    setCharCount(chars);
    setArticle(prev => ({
      ...prev,
      readTime: Math.ceil(words / 200)
    }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
    if (name === 'content') {
      calculateStats(value);
    }
    setSaveStatus('unsaved');
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!article.tags.includes(tagInput.trim())) {
        setArticle(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAutoSave = async () => {
    if (mode === 'edit' && isEditing) {
      try {
        await updateArticle(id, article);
        setSaveStatus('saved');
      } catch (err) {
        setSaveStatus('error');
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (mode === 'create') {
        const newArticle = await createArticle(article);
        setToastData({
          message: 'Article created successfully! 🎉',
          type: 'success'
        });
        setShowToast(true);
        navigate(`/publisher/edit-article/${newArticle.id}`);
      } else {
        await updateArticle(id, article);
        setSaveStatus('saved');
        setToastData({
          message: 'Article saved successfully!',
          type: 'success'
        });
        setShowToast(true);
      }
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to save article',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (status, scheduledDate) => {
    try {
      const updated = await updateArticle(id, {
        ...article,
        status,
        scheduledDate,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined,
      });
      setArticle(updated);
      setSaveStatus('saved');
      setToastData({
        message: status === 'published' 
          ? 'Article published successfully! 🎉' 
          : `Article ${status}`,
        type: 'success'
      });
      setShowToast(true);
      navigate('/publisher/articles');
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to publish article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    const newText = text.substring(0, start) + prefix + selected + suffix + text.substring(end);
    setArticle(prev => ({ ...prev, content: newText }));
    calculateStats(newText);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = end + prefix.length;
    }, 0);
  };

  if (loading && mode === 'edit') {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton variant="card" height="60px" />
        <Skeleton variant="title" height="48px" />
        <Skeleton variant="card" height="400px" />
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-warmBeige-100">
              {mode === 'create' ? 'Create Article' : 'Edit Article'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-warmBeige-400">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
              <span>•</span>
              <span>{article.readTime || 0} min read</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <ArticleStatus status={article.status} />
            {saveStatus === 'saved' && (
              <Badge variant="success" size="xs">Saved</Badge>
            )}
            {saveStatus === 'unsaved' && (
              <Badge variant="warning" size="xs">Unsaved</Badge>
            )}
          </div>

          {/* Toolbar Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreview}
            icon={isPreview ? <FiEdit2 /> : <FiEye />}
          >
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            icon={<FiSettings />}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            icon={isFullscreen ? <FiMinimize /> : <FiMaximize />}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            loading={isSaving}
            icon={<FiSave />}
          >
            Save Draft
          </Button>
          <PublishButton
            articleId={id}
            status={article.status}
            onPublish={handlePublish}
          />
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Editor */}
        <div className="lg:col-span-3">
          <Card variant="glass" padding="md" className="relative">
            {isPreview ? (
              // Preview Mode
              <div className="prose prose-invert max-w-none p-4 min-h-[500px]">
                <h1>{article.title}</h1>
                {article.coverImage && (
                  <img src={article.coverImage} alt={article.title} className="rounded-xl" />
                )}
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-4">
                {/* Title Input */}
                <input
                  ref={titleRef}
                  type="text"
                  name="title"
                  value={article.title}
                  onChange={handleContentChange}
                  placeholder="Enter article title..."
                  className="w-full text-2xl md:text-3xl font-bold bg-transparent border-none focus:outline-none text-warmBeige-100 placeholder-warmBeige-500/50"
                />

                {/* Excerpt Input */}
                <textarea
                  name="excerpt"
                  value={article.excerpt}
                  onChange={handleContentChange}
                  placeholder="Write a brief excerpt..."
                  rows={2}
                  className="w-full text-warmBeige-300 bg-transparent border-none focus:outline-none placeholder-warmBeige-500/50 resize-none"
                />

                {/* Divider */}
                <hr className="border-warmBeige-500/10" />

                {/* Markdown Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                  <button onClick={() => insertMarkdown('**', '**')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Bold">
                    <FiBold size={14} />
                  </button>
                  <button onClick={() => insertMarkdown('*', '*')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Italic">
                    <FiItalic size={14} />
                  </button>
                  <button onClick={() => insertMarkdown('__', '__')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Underline">
                    <FiUnderline size={14} />
                  </button>
                  <div className="w-px h-6 bg-warmBeige-500/10" />
                  <button onClick={() => insertMarkdown('[](url)')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Link">
                    <FiLink size={14} />
                  </button>
                  <button onClick={() => insertMarkdown('- ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Bullet List">
                    <FiList size={14} />
                  </button>
                  <button onClick={() => insertMarkdown('1. ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Numbered List">
                    <FiListOrdered size={14} />
                  </button>
                  <div className="w-px h-6 bg-warmBeige-500/10" />
                  <button onClick={() => insertMarkdown('> ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Quote">
                    <FiQuote size={14} />
                  </button>
                  <button onClick={() => insertMarkdown('```\n', '\n```')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Code Block">
                    <FiCode size={14} />
                  </button>
                  <div className="w-px h-6 bg-warmBeige-500/10" />
                  <button onClick={() => insertMarkdown('# ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Heading">
                    H1
                  </button>
                  <button onClick={() => insertMarkdown('## ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Heading 2">
                    H2
                  </button>
                  <button onClick={() => insertMarkdown('### ')} className="p-1.5 rounded text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all" title="Heading 3">
                    H3
                  </button>
                </div>

                {/* Content Editor */}
                <textarea
                  ref={contentRef}
                  name="content"
                  value={article.content}
                  onChange={handleContentChange}
                  placeholder="Write your article content here... (Markdown supported)"
                  rows={18}
                  className="w-full bg-transparent border-none focus:outline-none text-warmBeige-300 font-mono text-sm leading-relaxed resize-none placeholder-warmBeige-500/50"
                />

                {/* Word Count Footer */}
                <div className="flex justify-end text-xs text-warmBeige-500">
                  {wordCount} words • {charCount} characters
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-1 space-y-4">
          <Card variant="glass" padding="md">
            <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Article Settings</h4>
            
            {/* Cover Image */}
            <div className="mb-3">
              <label className="text-xs text-warmBeige-400 block mb-1">Cover Image</label>
              <div className="relative">
                <input
                  type="text"
                  name="coverImage"
                  value={article.coverImage}
                  onChange={handleContentChange}
                  placeholder="Image URL"
                  className="w-full px-3 py-2 text-sm rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-warmBeige-400 hover:text-warmBeige-100">
                  <FiUpload size={14} />
                </button>
              </div>
              {article.coverImage && (
                <div className="mt-2 relative rounded-lg overflow-hidden h-24">
                  <img src={article.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="text-xs text-warmBeige-400 block mb-1">Category</label>
              <select
                name="category"
                value={article.category}
                onChange={handleContentChange}
                className="w-full px-3 py-2 text-sm rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              >
                <option value="">Select category...</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Politics">Politics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="World">World</option>
              </select>
            </div>

            {/* Tags */}
            <div className="mb-3">
              <label className="text-xs text-warmBeige-400 block mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-1">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="glass" size="sm" className="flex items-center gap-1">
                    #{tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="text-warmBeige-400 hover:text-red-400"
                    >
                      <FiX size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagAdd}
                placeholder="Add tag..."
                className="w-full px-3 py-2 text-sm rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              />
            </div>

            {/* Scheduled Date */}
            <div className="mb-3">
              <label className="text-xs text-warmBeige-400 block mb-1">Schedule</label>
              <input
                type="datetime-local"
                name="scheduledDate"
                value={article.scheduledDate || ''}
                onChange={handleContentChange}
                className="w-full px-3 py-2 text-sm rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
              />
            </div>

            {/* SEO Preview */}
            <div className="mt-3 pt-3 border-t border-warmBeige-500/10">
              <h5 className="text-xs font-medium text-warmBeige-400 mb-2">SEO Preview</h5>
              <div className="p-2 rounded-lg bg-navy-800/30">
                <p className="text-sm font-medium text-blue-400 truncate">
                  {article.title || 'Article Title'}
                </p>
                <p className="text-xs text-warmBeige-400 truncate">
                  {article.excerpt || 'Article description...'}
                </p>
                <p className="text-xs text-warmBeige-500">bartaone.com/article/...</p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card variant="glass" padding="md">
            <h4 className="text-sm font-medium text-warmBeige-400 mb-2">Quick Stats</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-warmBeige-400">Words</span>
                <span className="text-warmBeige-100">{wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmBeige-400">Characters</span>
                <span className="text-warmBeige-100">{charCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmBeige-400">Read Time</span>
                <span className="text-warmBeige-100">{article.readTime || 0}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmBeige-400">Status</span>
                <ArticleStatus status={article.status} size="sm" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;