"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/dataStore";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

export default function NewBlogPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");

  function generateSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    addBlog({ title, slug, content, imageUrl, category: "" });
    setSaved(true);
    setSaving(false);
    setTimeout(() => router.push("/admin/blogs"), 800);
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/15 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-outline-variant/15">
          <div className="text-sm font-bold tracking-tighter text-primary font-headline">THE PULSE ON AI</div>
          <div className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="font-headline text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blogs" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_back</Link>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">New Blog Post</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Write and publish a new article</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 space-y-6">
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Title *</label>
              <input
                value={title}
                onChange={e => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                placeholder="Article headline..."
                required
              />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Slug</label>
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all text-primary"
                placeholder="auto-generated-from-title"
              />
            </div>

            {/* Cover Image - Upload or URL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant">Cover Image</label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    className={`px-3 py-1 rounded font-headline text-[10px] uppercase tracking-widest transition-all ${
                      imageMode === "upload" ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    className={`px-3 py-1 rounded font-headline text-[10px] uppercase tracking-widest transition-all ${
                      imageMode === "url" ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    URL
                  </button>
                </div>
              </div>

              {imageMode === "upload" ? (
                <>
                  {/* Drag and Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : imageUrl
                        ? "border-primary/30 bg-surface-container"
                        : "border-outline-variant/30 bg-surface-container-highest hover:border-primary/40 hover:bg-surface-container"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {imageUrl ? (
                      <div className="relative">
                        <img src={imageUrl} alt="Cover preview" className="w-full h-48 object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent rounded-xl" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                          <span className="font-headline text-[10px] uppercase tracking-widest text-primary">✓ Image loaded</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setImageUrl(""); }}
                            className="flex items-center gap-1 px-3 py-1 bg-error/20 text-error rounded font-headline text-[10px] uppercase tracking-widest hover:bg-error/30 transition-all z-20 relative"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 px-4">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3">cloud_upload</span>
                        <p className="font-headline text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                          {isDragging ? "Drop image here" : "Drag & drop or click to upload"}
                        </p>
                        <p className="text-[10px] text-on-surface-variant/50 font-body">PNG, JPG, GIF, WebP — Max 5MB</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <input
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                  placeholder="https://..."
                />
              )}

              {/* Preview for URL mode */}
              {imageMode === "url" && imageUrl && (
                <div className="mt-3 relative rounded-xl overflow-hidden">
                  <img src={imageUrl} alt="Cover preview" className="w-full h-48 object-cover rounded-xl" />
                  <div className="absolute bottom-2 left-3">
                    <span className="font-headline text-[10px] uppercase tracking-widest text-primary bg-surface/80 px-2 py-1 rounded">✓ Preview</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Content *</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={12}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y"
                placeholder="Write your article content here... (Markdown supported)"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">{saving ? "hourglass_empty" : "save"}</span>
              {saving ? "Saving..." : "Publish Post"}
            </button>
            <Link href="/admin/blogs" className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">
              Cancel
            </Link>
            {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Saved successfully</span>}
          </div>
        </form>
      </main>
    </div>
  );
}
