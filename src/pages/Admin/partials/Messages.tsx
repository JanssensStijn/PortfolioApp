import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MessageDetailsType } from '../../../firebase/messageTypes';
import { Box, Fab } from '@mui/material';
import { deleteMessage, toggleReadStatus, toggleHandeledStatus } from '../../../firebase/MessageChanges';
import { Delete, Reply, Mail, MailOutline, CheckCircleOutline, CheckCircle } from '@mui/icons-material';

type MessagesProps = {
    messages: MessageDetailsType[];
}

const replyToMessage = (message: MessageDetailsType) => {
    const recipientEmail = message.mailOfContact;
    const subject = 'Re: Portfolio Contact Request';
    const body = '\n\n message from: ' + message.firstnameOfContact + ' '+ message.lastnameOfContact + '\n\n' + message.message + '\n';
    const mailToLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailToLink, '_blank');
}

export const Messages: React.FC<MessagesProps> = ({messages}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>{messages.map((message: MessageDetailsType) => (
      <Accordion 
        key={message.id}
        expanded={expanded === message.id}
        onChange={handleChange(message.id)}
        sx={{width: '80vw'}}>
        <AccordionSummary>
            <Fab size="small" 
                color="primary"
                onClick={() => {
                    toggleReadStatus(message);
                }}
                >
                {message.status === 'unread' && <Mail/>}
                {message.status !== 'unread' && <MailOutline/>}
            </Fab>
          <Typography sx={{ width: '40%', flexShrink: 0 }}>
            {message.firstnameOfContact} {message.lastnameOfContact}
          </Typography>
          <Typography sx={{ width: '30%', color: 'text.secondary' }}>
            {(!message.jobtitleOfContact || !message.companyOfContact ) && <>{message.jobtitleOfContact} {message.companyOfContact}</>}
            {(message.jobtitleOfContact && message.companyOfContact ) && <>{message.jobtitleOfContact} - {message.companyOfContact}</>}
          </Typography>
          <Box sx={{width: '30%'}}>
            <Fab size="small" 
              color="error"
              onClick={() => deleteMessage(message)}
              sx={{marginLeft: '10px', float: 'right'}}
              >
              <Delete/>
            </Fab>
            <Fab size="small" 
              color="primary"
              onClick={() => replyToMessage(message)}
              sx={{marginLeft: '10px', float: 'right'}}
              >
              <Reply/>
            </Fab>
            {message.handeled && <Fab size="small" 
              color="primary"
              onClick={() =>toggleHandeledStatus(message)}
              sx={{marginLeft: '10px', float: 'right'}}
              >
              <CheckCircle/>
            </Fab>}
            {!message.handeled && <Fab size="small" 
              color="primary"
              onClick={() =>toggleHandeledStatus(message)}
              sx={{marginLeft: '10px', float: 'right'}}
              >
              <CheckCircleOutline/>
            </Fab>}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {message.message}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}</>
  );
}