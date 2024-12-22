import { FC } from "react";
import { Box, Typography, Zoom, Paper, CircularProgress, Button} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Project } from "../../../firebase/DataTypes";

type ProjectsProps = {
    projects: Project[];
};

export const Projects: FC<ProjectsProps> = ({projects}) => {
    return (
        <>
            {projects.map((project) => (
                <>
                    {project.imageUrl !== "" && project.title !== "" && project.linkToGithub !== "" &&
                        <Grid xs={12} md={6} key={project.id} onClick={() => window.open(project.linkToGithub, '_blank')} sx={{cursor: 'pointer'}}>
                            <Zoom in style={{ transitionDelay: `500ms`}}>
                                <Paper elevation={8} sx={{backgroundColor: 'var(--headerColor)'}}>
                                    <Box display="flex" flexDirection="column" alignItems="center" padding={"20px"}>
                                        <img style={{maxWidth: "90%", maxHeight:"250px", marginTop: "5%"}} src={project.imageUrl} alt={project.title}></img>
                                        <Typography variant="h1" textAlign={"center"} sx={{color: 'var(--mainTextColor)', marginTop: "10px", fontSize: "2rem"}}>{project.title}</Typography>
                                        <Typography variant="body1" textAlign={"center"} sx={{color: 'var(--mainTextColor)'}}>{project.description}</Typography>
                                        {project.fileNameToDownload && (
                                            <Button
                                                sx={{marginTop: "10px"}}
                                                variant="outlined"
                                                component="a"
                                                href={project.fileNameToDownload}
                                                download
                                                onClick={(e) => e.stopPropagation()} 
                                            >
                                                Download {project.fileNameToDownload}
                                            </Button>
                                        )}
                                    </Box>
                                </Paper>
                            </Zoom>
                        </Grid>
                    }
                    {project.imageUrl !== "" && project.title !== "" && project.linkToGithub === "" &&
                        <Grid xs={12} md={6} key={project.id}>
                            <Zoom in style={{ transitionDelay: `500ms`}}>
                                <Paper elevation={8} sx={{backgroundColor: 'var(--headerColor)'}}>
                                    <Box display="flex" flexDirection="column" alignItems="center" padding={"20px"}>
                                        <img style={{maxWidth: "90%", maxHeight:"250px", marginTop: "5%"}} src={project.imageUrl}></img>
                                        <Typography variant="h5" textAlign={"center"} sx={{color: 'var(--mainTextColor)', marginTop: "10px"}}>{project.title}</Typography>
                                        <Typography variant="body1" textAlign={"center"} sx={{color: 'var(--mainTextColor)'}}>{project.description}</Typography>
                                        {project.fileNameToDownload && (
                                            <Button
                                                sx={{marginTop: "10px"}}
                                                variant="outlined"
                                                component="a"
                                                href={project.fileNameToDownload}
                                                download
                                            >
                                                Download {project.fileNameToDownload}
                                            </Button>
                                        )}
                                    </Box>
                                </Paper>
                            </Zoom>
                        </Grid>
                    }
                </>
            ))}
        </>
    );
};
