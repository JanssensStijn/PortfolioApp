import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Add } from "@mui/icons-material";
import { addNewProject } from "../../firebase/DataChanges";
import { useProjectsContext } from "../../providers/projectProvider";
import { ProjectEdit } from "./partials/ProjectEdit";

export const ProjectEditPage = () => {

    const projects = useProjectsContext().projects;
    const loading = useProjectsContext().loading;
    const error = useProjectsContext().error;

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" 
                sx={{color: 'var(--accentColor)',
                     marginBottom:"20px"
                    }}>
                Edit projects
            </Typography>
            <Fab variant="extended"
                color="primary" 
                onClick={() => addNewProject()}
                sx={{margin: '15px',
                    position: 'absolute',
                    bottom: '1%',
                    right: '5%',
                }}>
                <Add />
                Add new Project
            </Fab>
            {loading && <CircularProgress/>}
            {error && <Typography variant="body1" sx={{color: 'var(--errorColor)'}}>{error}</Typography>}
            
            {projects && <>
                <Grid container spacing={2} marginLeft={'auto'} marginRight={'auto'}>
                    <ProjectEdit data={projects}/>
                </Grid>
            </>}
        </Box>
    );
};