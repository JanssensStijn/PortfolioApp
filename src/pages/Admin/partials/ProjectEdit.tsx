import { FC, useEffect, useState } from "react";
import {Paper, TextField, Fab } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Delete, Save } from "@mui/icons-material";
import { deleteProject, updateProject } from "../../../firebase/DataChanges";
import { Project } from "../../../firebase/DataTypes";

type EduEditProps = {
    data?: Project[];
};

type OrderedProject = Project & { internalOrder: number };

export const ProjectEdit: FC<EduEditProps> = ({ data }) => {
    const [projects, setProjects] = useState<OrderedProject[]>([]);

    useEffect(() => {
        const updatedEducations = data
          ?.sort((a, b) => a.order - b.order)
          .map<OrderedProject>((projects, index) => ({ ...projects, internalOrder: index }));
    
        setProjects(updatedEducations || []);
    }, [data]);

    const updateSingleProject = (project: OrderedProject) => {
        const filteredProjects = projects.filter((pro) => pro.id !== project.id);
        const updatedProjects = [...filteredProjects, project].sort(
          (a, b) => a.internalOrder - b.internalOrder
        );
        setProjects(updatedProjects);
    };

    const handleTitleChange = (project: OrderedProject, title: string) => {
        updateSingleProject({ ...project, title });
    };

    const handleOrderChange = (project: OrderedProject, order: number) => {
        updateSingleProject({ ...project, order });
    };

    const handleImageUrlChange = (project: OrderedProject, imageUrl: string) => {
        updateSingleProject({ ...project, imageUrl });
    };

    const handleLinkToGithubChange = (project: OrderedProject, linkToGithub: string) => {
        updateSingleProject({ ...project, linkToGithub });
    };

    const handleDescriptionChange = (project: OrderedProject, description: string) => {
        updateSingleProject({ ...project, description });
    };


    return (
        <Grid container direction="column" width={"80vw"}>
            {projects?.map((project) => (
                <Grid key={project.id} sm={12}  marginLeft={'auto'} marginRight={'auto'}>
                    <Paper elevation={3} style={{ padding: '16px',marginBottom:'16px'}} >
                        <Grid container width={'100%'}  >
                            <Grid container width={'80%'} columnGap={'2%'}>
                                <Grid width={'70%'}>
                                    <TextField
                                        label="Project title"
                                        variant="outlined"
                                        value={project.title}
                                        fullWidth
                                        onChange={(e) => 
                                            handleTitleChange(project, e.target.value)}
                                    />
                                </Grid>
                                <Grid width={'28%'}>
                                    <TextField
                                        label="Order"
                                        variant="outlined"
                                        value={project.order}
                                        fullWidth
                                        type="number"
                                        onChange={(e) => 
                                            handleOrderChange(project, Number(e.target.value))}
                                    />
                                </Grid>
                                <Grid width={'100%'} marginTop={'2%'}>
                                    <TextField
                                        label="url of image"
                                        variant="outlined"
                                        value={project.imageUrl}
                                        fullWidth
                                        onChange={(e) => 
                                            handleImageUrlChange(project, e.target.value)}
                                    />
                                </Grid>
                                <Grid width={'100%'} marginTop={'2%'}>
                                    <TextField
                                        label="link to github"
                                        variant="outlined"
                                        value={project.linkToGithub}
                                        fullWidth
                                        onChange={(e) => 
                                            handleLinkToGithubChange(project, e.target.value)}
                                    />
                                </Grid>
                                <Grid width={'100%'} marginTop={'2%'}>
                                    <TextField
                                        label="description"
                                        variant="outlined"
                                        value={project.description}
                                        fullWidth
                                        onChange={(e) => 
                                            handleDescriptionChange(project, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid width={'15%'} margin={'auto'}>
                                <Fab color="success" 
                                    onClick={() => updateProject(project)}
                                    sx={{margin: '5px'}}>
                                    <Save />
                                </Fab>
                                <Fab color="error"
                                    onClick={() => deleteProject(project)}
                                    sx={{margin: '5px'}}>
                                    <Delete />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
