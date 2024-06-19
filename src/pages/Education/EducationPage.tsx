import { Box, CircularProgress, Divider, Paper, Typography} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEducationContext } from '../../providers/educationProvider';
import { v4 as uuidv4 } from 'uuid';

export const EducationPage = () => {

    const educations = useEducationContext().educations?.sort((a: any, b: any) => b.yearOfEnd - a.yearOfEnd);
    const loading = useEducationContext().loading;
    const error = useEducationContext().error;

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Education</Typography>
            {loading && <CircularProgress color="success"/>}
            {error && <p>Something went wrong</p>}
            <Grid container spacing={2} marginLeft={'auto'} marginRight={'auto'} width={'80vw'}>
                {educations?.map((education: any) => (
                    <Grid key={uuidv4()} sm={12} marginLeft={'auto'} marginRight={'auto'}>
                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Grid container width={'100%'}  >
                                <Grid xs={12} md={6} margin={'auto'}>
                                    <img src={education.logoUrl} alt={education.shool} style={{maxHeight:"100px", height:"auto"}}/>
                                </Grid>
                                <Grid container key={uuidv4()} xs={12} md={6} rowGap={2} columnGap={'2%'}>
                                    <Grid key={uuidv4()} width={'100%'}>
                                        <Typography variant="h4" sx={{color: 'var(--secondTextColor)'}}>{education.school}</Typography>
                                    </Grid>
                                    <Grid key={uuidv4()} width={'100%'}>
                                        <Typography variant="h5" sx={{color: 'var(--secondTextColor)'}}>{education.course}</Typography>
                                    </Grid>
                                    <Grid key={uuidv4()} width={'100%'}>
                                        <Typography variant="body1" style={{color: 'var(--secondTextColor)'}}>{education.yearOfStart} - {education.yearOfEnd}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
