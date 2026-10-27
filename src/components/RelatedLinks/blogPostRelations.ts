import type { BlogPost, Project, Workplace } from "../../data/models";
import type { RelatedLink } from "./RelatedLinks";

// Resolves what a post is about into display links. A relation is dropped
// until its data has loaded rather than falling back to the slug - slugs are
// not display names, so "playrates" would render in place of "PlayRates".
export const relatedProjectLink = (
    post: BlogPost,
    projects: Project[]
): RelatedLink[] => {
    const project = projects.find((p) => p.slug === post.relatedProject);
    if (!post.relatedProject || !project) {
        return [];
    }
    return [
        {
            icon: "folder_open",
            label: project.title,
            to: "/projects/" + project.slug,
        },
    ];
};

export const relatedRoleLink = (
    post: BlogPost,
    workplaces: Workplace[]
): RelatedLink[] => {
    if (!post.relatedRole) {
        return [];
    }
    for (const w of workplaces) {
        const role = w.roles.find((r) => r.id === post.relatedRole);
        if (role) {
            return [
                {
                    icon: "work",
                    label: `${role.role} at ${w.workplace}`,
                    to: "/#work",
                },
            ];
        }
    }
    return [];
};
