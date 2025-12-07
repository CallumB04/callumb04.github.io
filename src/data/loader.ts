import type { Project, Technology } from "./models";

const PROJECTS_FILE_PATH = "../../public/data/projects.json";
const TECHNOLOGIES_FILE_PATH = "../../public/data/technologies.json";
const BLOGS_FILE_PATH = "../../public/data/blogs.json";

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
