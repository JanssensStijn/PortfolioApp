export type Skill = {
    id: string;
    category: string;
    name: string;
    logoUrl: string;
    rating?: number;
}

export type Education = {
    id: string;
    school: string;
    course: string;
    yearOfStart: number;
    yearOfEnd: number;
    logoUrl: string;
}

export type Personal = {
    id: string;
    firstName: string;
    lastName: string;
    jobtitle: string;
    mail: string;
    cellphone: string;
    github: string;
    linkedin: string;
    bio: string;
    pictureUrl: string;
    intro: string;
}

export type Project = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    order: number;  
    linkToGithub: string;
    fileNameToDownload: string;
}

export type Projects = {
    projects: Project[];
}