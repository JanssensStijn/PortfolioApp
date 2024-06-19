import { Box, CircularProgress, Typography } from '@mui/material';
import { usePersonalDataContext } from '../../providers/personalProvider';

export const AboutMePage = () => {
    const personal = usePersonalDataContext().personalData;
    const loading = usePersonalDataContext().loading;
    const error = usePersonalDataContext().error;

    return (<>
        
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>About me</Typography>
            {loading && <CircularProgress color="success"/>}
            {error && <p>Something went wrong</p>}
            {personal &&
                <Box key={personal.id} display="flex" flex={1} flexDirection="row"  alignItems="center" maxWidth={'500px'}>
                    <Box display="flex" flex={1} flexDirection="column">
                        <Typography variant="h2" sx={{color: 'var(--mainTextColor)'}}>
                            {personal.firstName} {personal.lastName}
                        </Typography>
                            <Typography variant="h5" sx={{color: 'var(--mainTextColor)', marginTop:"20px"}}>
                                {personal.jobtitle}
                            </Typography>
                            <Typography variant="body1" sx={{color: 'var(--mainTextColor)', marginTop:"20px"}} component="div">
                                <div dangerouslySetInnerHTML={{ __html: personal.bio }} />
                            </Typography>
                    </Box>
                </Box>
            }
            </Box>
        </>
    );
};