import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from './config';
import { v4 as uuidv4 } from 'uuid';
import { Education, Personal, Project, Skill } from './DataTypes';

export const addNewSkill = (category: String) => {
    const id = uuidv4();
    setDoc(doc(firebaseDB, "skills", id),{
        id: id,
        category: category,
        name: "",
        logoUrl: "",
        rating: 0,
    });
}

export const updateSkill = (skillToUpdate: Skill) => {
    updateDoc(doc(firebaseDB, "skills", skillToUpdate.id),{
        name: skillToUpdate.name,
        logoUrl: skillToUpdate.logoUrl,
        rating: skillToUpdate.rating,
    });
}

export const deleteSkill = (skillToDelete: Skill) => {
    deleteDoc(doc(firebaseDB, "skills", skillToDelete.id));
}


export const deleteEducation = (educationToDelete: Education) => {
    deleteDoc(doc(firebaseDB, "education", educationToDelete.id));
}

export const updateEducation = (educationToUpdate: Education) => {
    updateDoc(doc(firebaseDB, "education", educationToUpdate.id),{
        school: educationToUpdate.school,
        course: educationToUpdate.course,
        yearOfStart: educationToUpdate.yearOfStart,
        yearOfEnd: educationToUpdate.yearOfEnd,
        logoUrl: educationToUpdate.logoUrl,
    });
}

export const addNewEducation = () => {
    const id = uuidv4();
    setDoc(doc(firebaseDB, "education", id),{
        id: id,
        school: "",
        course: "",
        yearOfStart: "",
        yearOfEnd: "",
        logoUrl: "",
    });
}

export const updatePersonal = (personal: Personal) => {
    updateDoc(doc(firebaseDB, "personal", personal.id),{
        firstName: personal.firstName,
        lastName: personal.lastName,
        jobtitle: personal.jobtitle,
        cellphone: personal.cellphone,
        mail: personal.mail,
        pictureUrl: personal.pictureUrl,
        github: personal.github,
        linkedin: personal.linkedin,
        bio: personal.bio
    });
}

export const deleteProject = (projectToDelete: Project) => {
    deleteDoc(doc(firebaseDB, "projects", projectToDelete.id));
}

export const updateProject = (projectToUpdate: Project) => {
    updateDoc(doc(firebaseDB, "projects", projectToUpdate.id),{
        order: projectToUpdate.order,
        title: projectToUpdate.title,
        description: projectToUpdate.description,
        imageUrl: projectToUpdate.imageUrl,
        linkToGithub: projectToUpdate.linkToGithub,
        fileNameToDownload: projectToUpdate.fileNameToDownload
    });
}

export const addNewProject = () => {
    const id = uuidv4();
    setDoc(doc(firebaseDB, "projects", id),{
        id: id,
        order: 0,
        title: "",
        description: "",
        imageUrl: "",
        linkToGithub: "",
        fileNameToDownload: ""
    });
}