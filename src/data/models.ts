export interface Project {
    slug: string; // unique id, in url when viewing
    title: string;
    summary: string;
    longDescription: string;
    technologies: string[]; // key of objects in technologies.json
    startDate?: string; // format: 9th March 2006
    finishDate?: string; // format: 9th March 2006
    images: string[]; // file names in project folder (first image is cover image) (/public/project_images/<project slug>/<filename>.png)
    githubRepo?: string; // CallumB04/<repo>
    liveURL?: string;
    collaborators?: Collaborator[];
    relatedBlogPost?: string; // slug of blog post
}

export interface Collaborator {
    name: string;
    avatar?: string;
}

export interface Technology {
    name: string;
    devicon?: string; // https://devicon.dev/
}

export interface BlogPost {
    slug: string; // unique id, in url when viewing, also name of directory containing blog data
    title: string;
    summary: string;
    sections: BlogPostSection[]; // section for each block of markdown text or image
    relatedProject?: string; // slug of project
}

export interface BlogPostSection {
    title: string;
    textFile?: string; // markdown file name in blog post folder (/public/blogs/<post slug>/<filename>.md)
    imageFile?: string; // image file name in blog post folder (/public/blogs/<post slug>/<filename>.png)
}
