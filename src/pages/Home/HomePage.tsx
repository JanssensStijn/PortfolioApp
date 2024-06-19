import { Box, Typography, Zoom, Paper, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { usePersonalDataContext } from '../../providers/personalProvider';
import { Projects } from './partials/projects';
import { useProjectsContext } from '../../providers/projectProvider';

export const HomePage = () => {
    const personal = usePersonalDataContext().personalData;
    const loading = usePersonalDataContext().loading;
    const error = usePersonalDataContext().error;

    const projects = useProjectsContext().projects;

    return (
        <>
            {loading && <CircularProgress color="success"/>}
            {error && <p>Something went wrong</p>}
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px", textAlign:"center"}}>Home</Typography>            
            {personal && (
                <Grid container key={personal.id} spacing={2}width={"80vw"} margin={"auto"}>
                    <Grid xs={12} md={6} alignItems="center" justifyContent="center">
                        <Box display="flex" flexDirection="column" alignItems="center" >
                            <div className='imageWrapper'>
                                <img src={personal.pictureUrl} alt="home" style={{maxWidth:"300px", height:"auto"}}/>
                            </div>
                        </Box>
                    </Grid>
                    <Grid container xs={12} md={6} alignItems="center" justifyContent="center">
                        <Box display="flex" flexDirection="column" textAlign="center">
                            <Typography variant="h2" sx={{ color: 'var(--mainTextColor)' }}>
                                {personal.firstName} {personal.lastName}
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'var(--mainTextColor)', marginTop: '20px' }}>
                                {personal.jobtitle}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'var(--mainTextColor)', marginTop: '20px', marginBottom: '20px' }}>
                                {personal.intro}
                            </Typography>
                        </Box>
                    </Grid>

                    <Projects projects={projects}/>
                </Grid>
            )}
        </>
    );
};