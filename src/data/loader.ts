import type { BlogPost, Project, Technology } from "./models";

const PROJECTS_FILE_PATH = "/data/projects.json";
const TECHNOLOGIES_FILE_PATH = "/data/technologies.json";
const BLOGS_FILE_PATH = "/data/blogs.json";

// Projects
export const loadAllProjects = async (): Promise<Project[]> => {
    try {
        const resp = await fetch(PROJECTS_FILE_PATH);
        const projects = await resp.json();
        return projects;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const loadProjectBySlug = async (
    slug: string
): Promise<Project | undefined> => {
    try {
        const projects = await loadAllProjects();
        for (const p of projects) {
            if (p.slug === slug) {
                return p;
            }
        }
    } catch (err) {
        console.error(err);
    }
};

// Technologies
export const loadTechnologyByKey = async (
    key: string
): Promise<Technology | undefined> => {
    try {
        const resp = await fetch(TECHNOLOGIES_FILE_PATH);
        const technologies = await resp.json();
        for (const t of Object.keys(technologies)) {
            if (t === key) {
                return technologies[t];
            }
        }
    } catch (err) {
        console.error(err);
    }
};

// Blog Posts
export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const resp = await fetch(BLOGS_FILE_PATH);
        const blogs = await resp.json();
        return blogs;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const loadBlogPostBySlug = async (
    slug: string
): Promise<BlogPost | undefined> => {
    try {
        const blogs = await loadAllBlogPosts();
        for (const b of blogs) {
            if (b.slug === slug) {
                return b;
            }
        }
    } catch (err) {
        console.error(err);
    }
};

export const loadBlogPostMarkdown = async (path: string): Promise<string> => {
    try {
        const resp = await fetch(path);
        const text = await resp.text();
        return text;
    } catch (err) {
        console.error(err);
        return "";
    }
};
