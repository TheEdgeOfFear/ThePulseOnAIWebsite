"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Recommended", href: "/admin/recommended", icon: "recommend" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

interface AdminUser {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

const defaultUsers: AdminUser[] = [
  { id: "1", email: "admin@thepulseonai.com", password: "admin123", role: "Super Admin", createdAt: "2026-03-01" },
];

function loadUsers(): AdminUser[] {
  if (typeof window === "undefined") return defaultUsers;
  try {
    const stored = localStorage.getItem("pulse_admin_users");
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultUsers;
}

function saveUsers(users: AdminUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pulse_admin_users", JSON.stringify(users));
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(defaultUsers);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUsers(loadUsers());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveUsers(users);
  }, [users, loaded]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  function resetForm() {
    setEmail("");
    setPassword("");
    setRole("Admin");
    setEditingUser(null);
    setShowForm(false);
    setSaved(false);
  }

  function handleEdit(user: AdminUser) {
    setEditingUser(user);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setShowForm(true);
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, email, password, role } : u));
    } else {
      const newUser: AdminUser = {
        id: Date.now().toString(),
        email,
        password,
        role,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    }
    setSaved(true);
    setTimeout(() => resetForm(), 1200);
  }

  function handleDelete(id: string) {
    if (users.length <= 1) {
      alert("Cannot delete the last admin user.");
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  }

  function togglePasswordVisibility(id: string) {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${item.href === '/admin/users' ? 'text-primary bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}>
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="font-headline text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-variant/15">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/10 transition-all">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-headline text-xs uppercase tracking-widest">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Users</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Manage who can access the admin dashboard</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add User
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-surface-container-low rounded-xl p-6 border border-primary/20 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">{editingUser ? "edit" : "person_add"}</span>
              <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">
                {editingUser ? "Edit User" : "New Admin User"}
              </h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                  placeholder="user@thepulseonai.com"
                  required
                />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Password *</label>
                <input
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                  placeholder="Secure password"
                  required
                />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  {editingUser ? "Update User" : "Create User"}
                </button>
                <button type="button" onClick={resetForm} className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">
                  Cancel
                </button>
                {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Saved</span>}
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
            <div className="col-span-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Email</div>
            <div className="col-span-3 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Password</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Role</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Created</div>
            <div className="col-span-1 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</div>
          </div>
          {users.map((user, i) => (
            <div key={user.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container transition-colors ${i < users.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
              <div className="col-span-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                <span className="font-headline text-sm font-medium text-on-surface">{user.email}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <span className="font-headline text-xs text-on-surface-variant font-mono">
                  {showPasswords[user.id] ? user.password : "••••••••"}
                </span>
                <button
                  onClick={() => togglePasswordVisibility(user.id)}
                  className="material-symbols-outlined text-[16px] text-on-surface-variant hover:text-primary transition-colors"
                >
                  {showPasswords[user.id] ? "visibility_off" : "visibility"}
                </button>
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded font-headline text-[10px] uppercase tracking-widest ${
                  user.role === "Super Admin" ? "bg-primary/10 text-primary" : user.role === "Admin" ? "bg-primary/5 text-primary/80" : "bg-surface-container text-on-surface-variant"
                }`}>
                  <span className="material-symbols-outlined text-[12px]">{user.role === "Super Admin" ? "shield" : user.role === "Admin" ? "admin_panel_settings" : "edit"}</span>
                  {user.role}
                </span>
              </div>
              <div className="col-span-2 font-headline text-xs text-on-surface-variant">{user.createdAt}</div>
              <div className="col-span-1 flex items-center gap-2">
                <button onClick={() => handleEdit(user)} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors">edit</button>
                <button onClick={() => handleDelete(user.id)} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-error transition-colors">delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-0.5">info</span>
          <div>
            <p className="font-headline text-xs font-bold text-primary uppercase tracking-widest mb-1">Security Note</p>
            <p className="text-on-surface-variant text-xs font-body">These credentials are saved to your browser and used to log in at <span className="text-primary">/login</span>. Changes take effect immediately.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

