import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEducationContext } from "../../providers/educationProvider";
import { EduEdit } from "./partials/EduEdit";
import { Add } from "@mui/icons-material";
import { addNewEducation } from "../../firebase/DataChanges";

export const EducationEditPage = () => {

    const educations = useEducationContext().educations;
    const loading = useEducationContext().loading;
    const error = useEducationContext().error;

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" 
                sx={{color: 'var(--accentColor)',
                     marginBottom:"20px"
                    }}>
                Edit education
            </Typography>
            {loading && <CircularProgress/>}
            {error && <Typography variant="body1" sx={{color: 'var(--errorColor)'}}>{error}</Typography>}
            {educations && <>
                <Fab variant="extended"
                    color="primary" 
                    onClick={() => addNewEducation()}
                    sx={{margin: '15px',
                    position: 'absolute',
                    bottom: '1%',
                    right: '5%',
                    }}>
                    <Add />
                    Add new education
                </Fab>
                <Grid container spacing={2} marginLeft={'auto'} marginRight={'auto'}>
                    <EduEdit data={educations}/>
                </Grid>
            </>}
        </Box>
    );
};