// Shared data store using localStorage for blogs, news, tutorials

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  imageUrl: string;
  createdAt: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  type: string; // "youtube" | "pdf"
  url: string;
  isSecured: boolean;
  createdAt: string;
}

// --- Default seed data ---

const defaultBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Mimicking the Human Synapse: The End of Von Neumann Architecture",
    slug: "human-synapse",
    content: "How carbon-based biological patterns are inspiring the next generation of silicon hardware.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJORNdtnF3THbRecpbifPe5CJyK_23sQss1oAT1heETn5Eg9YI0b3lORujUN67Ol4IjjGune9tl0VIjEnCPACm5R4yd4RCDVToeraxdV2rlUj9F7picfyrLj0coGzZOBL7pCQoWJ7xaYSAF-kLmp4gbuPCYoOfWc7TfF4HiVnrGfBeu1MspzvgcOunaBkxi_2lejNvTMPV7OUzew-YtX7Baib3d7nXKZbjVPQgTe3k8pKpHjH9cSoCX9doUow4_qF4o-Um-SNdU50i",
    category: "Neuromorphic Computing",
    createdAt: "2026-03-18",
  },
  {
    id: "2",
    title: "The Alignment Problem: Who Codes the Morality of Autonomous Systems?",
    slug: "alignment-problem",
    content: "Exploring the philosophical frameworks being embedded into large-scale decision models.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRf0Bth6fwiY7guIvH49jZrNlYQH48zGvBI5vj7XEZ526P0FVtue4C3QtLAVVMopIU5aqCk2FyrETsHFxgek1T9R7CPukwOXmSQDfsGsQz-Av39bcfET8DGKUh1umgOolxF-I4bzYPLFVQX9KWpJQIs5pnKcXJSjMorkoHlnsZ7Cqrm79w-EB39ZAqwwtSkVpjs3XqtLoaTLXi-UVyT4RuSVppYZJ0wNGOx8z0rXlRItCE9TeXGBjx1lDiDOkhdznwMVgIJ7wsj-wm",
    category: "Robotic Ethics",
    createdAt: "2026-03-15",
  },
  {
    id: "3",
    title: "Qubits and Cognition: Can Quantum Supremacy solve Artificial General Intelligence?",
    slug: "qubits-cognition",
    content: "Mapping the intersection of quantum processing and neural scaling laws.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeSGpER9aT15icSB-fo-xQkpDTy-EJkf8SvrLJeVkcSRyTzJUlqEGoDxe8h8j3874qanE2wXhjJrCipXGerQdFjQLYtkC3wnG0w50zmV2PH2AYP-XeYrK4e868uKdytyNNfQwRbwPQFLVr5D7LIgzyKVht4_y6cKY1m8p1AFN8MJRAggDTcr4F37AHlZg2Q3-BKY3Deozy1PqzJrbsBH9N7hle2kkmyvx_0rsRPoTyOGkesrtOdOM3zyViEop470wlD0f8GloMkW9O",
    category: "Quantum AI",
    createdAt: "2026-03-10",
  },
];

const defaultNews: NewsArticle[] = [
  { id: "1", title: "DeepMind's New Model Achieves 99% Logical Reasoning", summary: "The latest architecture demonstrates near-human cognitive flexibility in abstract problem-solving environments.", category: "Breaking", source: "Research Lab", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXkCl__vuNYVz2f9KGCtW3oer2Q8jSFBAIUct-6IWN0dk8x9DJ3KgyRYyTimo7hcr7SsYdcf9mmaSdW4I5WTTHH6PCHSct37VeXIzccvts91o3ERjqIULFODSNvr0V-5ZoVVygGr3StpSYODQEBWhxsqgsljfNfMnbpGSxEMqHbTIBIxLjlFCDNvCGr8olsiJYIzlav0uPRzBEZQGf6zUAHh6tgJrtOED_GhbPAzDUetlzSPgV346-6m1tj-RcspVWiG3sSM6sDppg", createdAt: "2026-03-20" },
  { id: "2", title: "Robotics Stocks Surge as Factory Automation Hits Record Highs", summary: "Markets react strongly to increased factory automation.", category: "Market Alert", source: "Data Pulse", imageUrl: "", createdAt: "2026-03-20" },
  { id: "3", title: "Nvidia Blackwell Chips Integration Begins at Major Data Hubs", summary: "Next-gen hardware rolls out across cloud providers.", category: "Hardware", source: "Tech Desk", imageUrl: "", createdAt: "2026-03-19" },
  { id: "4", title: "Global AI Safety Accord Signed by 14 Leading Research Labs", summary: "International cooperation on AI safety reaches milestone.", category: "Policy", source: "Policy Wire", imageUrl: "", createdAt: "2026-03-18" },
];

const defaultTutorials: Tutorial[] = [
  { id: "1", title: "Prompt Engineering 2.0", description: "Mastering the logic behind stochastic resonance.", type: "youtube", url: "https://youtube.com", isSecured: false, createdAt: "2026-03-15" },
  { id: "2", title: "Robotics Kinematics Deep Dive", description: "Advanced joint control and inverse kinematics.", type: "pdf", url: "/training/robotics.pdf", isSecured: true, createdAt: "2026-03-12" },
  { id: "3", title: "LLM Fine-Tuning Workshop", description: "Hands-on LoRA and QLoRA techniques.", type: "youtube", url: "https://youtube.com", isSecured: true, createdAt: "2026-03-10" },
  { id: "4", title: "Introduction to AI Agents", description: "Building autonomous multi-step AI systems.", type: "youtube", url: "https://youtube.com", isSecured: false, createdAt: "2026-03-08" },
];

// --- Generic helpers ---

function load<T>(key: string, defaults: T[]): T[] {
  if (typeof window === "undefined") return defaults;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaults;
}

function save<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Blog CRUD ---

export function loadBlogs(): BlogPost[] { return load<BlogPost>("pulse_blogs", defaultBlogs); }
export function saveBlogs(blogs: BlogPost[]) { save("pulse_blogs", blogs); }
export function addBlog(blog: Omit<BlogPost, "id" | "createdAt">): BlogPost {
  const blogs = loadBlogs();
  const newBlog: BlogPost = { ...blog, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] };
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return newBlog;
}
export function updateBlog(id: string, updates: Partial<BlogPost>) {
  const blogs = loadBlogs().map(b => b.id === id ? { ...b, ...updates } : b);
  saveBlogs(blogs);
}
export function deleteBlog(id: string) {
  saveBlogs(loadBlogs().filter(b => b.id !== id));
}

// --- News CRUD ---

export function loadNews(): NewsArticle[] { return load<NewsArticle>("pulse_news", defaultNews); }
export function saveNews(news: NewsArticle[]) { save("pulse_news", news); }
export function addNews(article: Omit<NewsArticle, "id" | "createdAt">): NewsArticle {
  const news = loadNews();
  const newArticle: NewsArticle = { ...article, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] };
  news.unshift(newArticle);
  saveNews(news);
  return newArticle;
}
export function updateNews(id: string, updates: Partial<NewsArticle>) {
  const news = loadNews().map(n => n.id === id ? { ...n, ...updates } : n);
  saveNews(news);
}
export function deleteNews(id: string) {
  saveNews(loadNews().filter(n => n.id !== id));
}

// --- Tutorial CRUD ---

export function loadTutorials(): Tutorial[] { return load<Tutorial>("pulse_tutorials", defaultTutorials); }
export function saveTutorials(tutorials: Tutorial[]) { save("pulse_tutorials", tutorials); }
export function addTutorial(tutorial: Omit<Tutorial, "id" | "createdAt">): Tutorial {
  const tutorials = loadTutorials();
  const newTutorial: Tutorial = { ...tutorial, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] };
  tutorials.unshift(newTutorial);
  saveTutorials(tutorials);
  return newTutorial;
}
export function updateTutorial(id: string, updates: Partial<Tutorial>) {
  const tutorials = loadTutorials().map(t => t.id === id ? { ...t, ...updates } : t);
  saveTutorials(tutorials);
}
export function deleteTutorial(id: string) {
  saveTutorials(loadTutorials().filter(t => t.id !== id));
}
