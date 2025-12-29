export interface Project {
    slug: string; // unique id, in url when viewing
    title: string;
    summary: string;
    longDescription: string;
    technologies: string[]; // key of objects in technologies.json, first 3 are "main" technologies, displayed on preview
    startDate?: string; // format: 9th March 2006
    finishDate?: string; // format: 9th March 2006
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
}

export interface BlogPostSection {
    title: string; // used in contents for text sections, used a image descriptor for image sections
    textFile?: string; // markdown file name in blog post folder (/public/blogs/<post slug>/<file>)
    imageFile?: string; // image file name in blog post folder (/public/blogs/<post slug>/<file>)
}
