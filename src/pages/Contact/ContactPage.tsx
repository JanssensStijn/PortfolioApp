import {Box, Typography, Icon, CircularProgress, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ContactForm } from './partials/ContactForm';
import { usePersonalDataContext } from '../../providers/personalProvider';

export const ContactPage = () => {
    const personalData = usePersonalDataContext().personalData;
    const loading = usePersonalDataContext().loading;
    const error = usePersonalDataContext().error;

    const recipientEmail = personalData?.email;
    const subject = 'Portfolio Contact Request';
    const body = 'Hi there,';
    const mailToLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (<>
        {loading && <CircularProgress color="success"/>}
        {error && <p>Something went wrong</p>}            
        {personalData && (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Contact</Typography>
            {personalData.mail && <>
                <Typography variant="h5" sx={{color: 'var(--mainTextColor)', marginTop: "20px"}}>Send me an email:</Typography>
                <Box display="flex" flex={1} flexDirection="row">
                    <a href={mailToLink} target="_blank" rel="noopener noreferrer" 
                        style={{textDecoration: "none", color: "inherit"}}>
                    <Typography variant="body1" sx={{color: 'var(--mainTextColor)'}}>
                        <Icon sx={{marginRight: "10px"}}><MailOutlineIcon/></Icon>
                        {personalData.mail} 
                    </Typography>
                    </a>
                </Box>
            </>}    
            {personalData.cellphone && <>
            <Typography variant="h5" sx={{color: 'var(--mainTextColor)', marginTop: "20px"}}>Give me a call:</Typography>
            <Box display="flex" flex={1} flexDirection="row">
                <a href="tel:+32495640035" target="_blank" rel="noopener noreferrer" 
                        style={{textDecoration: "none", color: "inherit"}}>
                    <Typography variant="body1" sx={{color: 'var(--mainTextColor)'}}>
                        <Icon sx={{marginRight: "10px"}}><CallIcon/></Icon>
                        {personalData.cellphone}
                    </Typography>
                </a>
            </Box>
            </>}
            <Box display="flex" flex={1} flexDirection="row">
                {personalData.linkedin && <IconButton href={personalData.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{color: "var(--mainTextColor)"
                    }}>
                    <LinkedInIcon/>
                </IconButton>}
                {personalData.github && <IconButton href={personalData.github} target="_blank" rel="noopener noreferrer"
                    style={{color: "var(--mainTextColor)"
                    }}>
                    <GithubIcon/>
                </IconButton>}
            </Box>
            <ContactForm/>
        </Box>
        )}
    </>
    );
};