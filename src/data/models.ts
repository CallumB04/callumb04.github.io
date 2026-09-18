export type ProjectStatusType =
    | "finished"
    | "in-progress"
    | "on-hold"
    | "discontinued";

export interface Project {
    slug: string; // unique id, in url when viewing
    title: string;
    summary: string;
    longDescription: string;
    technologies: string[]; // key of objects in technologies.json, first 3 are "main" technologies, displayed on preview
    date?: string; // year the project was started, format: 2006
    status: ProjectStatusType;
    images: string[]; // file names in project folder (folder also includes banner.png for preview card) (/public/project_images/<project slug>/<file>)
    githubRepo?: string; // CallumB04/<repo>
    liveURL?: string;
    featured?: boolean; // is featured on portfolio index page?
}

export interface Technology {
    name: string;
    devicon?: string; // https://devicon.dev/
}

export interface BlogPost {
    slug: string; // unique id, in url when viewing, also name of directory containing blog data
    title: string;
    summary: string;
    date: string; // format: 9th March 2006
    sections: BlogPostSection[]; // section for each block of markdown text or image
    relatedProject?: string; // slug of project
    relatedRole?: string; // id of work role
}

export interface BlogPostSection {
    title: string; // used in contents for text sections, used a image descriptor for image sections
    textFile?: string; // markdown file name in blog post folder (/public/blogs/<post slug>/<file>)
    imageFile?: string; // image file name in blog post folder (/public/blogs/<post slug>/<file>)
}

export interface WorkRole {
    id: string; // unique id, used to link blog posts to a role
    timeframe: string; // Jan 2024 - Feb 2025 (separator is exactly " - ")
    role: string;
    details?: string[]; // bullet points
    technologies?: string[];
}

export interface Workplace {
    workplace: string;
    workLogo: string; // file name in /public/work_logos/<file>
    roles: WorkRole[]; // most recent role first
    isCurrent?: boolean; // currently working here?
}
