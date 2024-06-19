import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { FC, useState } from "react";
import { addNewMessage } from "../../../firebase/MessageChanges";
import SendIcon from '@mui/icons-material/Send';
import validator from 'validator';
import { NewMessageType } from "../../../firebase/messageTypes";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactForm: FC = () => {
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    
    const [contactFormInput, setContactFormInput] = useState<NewMessageType>({
        firstnameOfContact: '',
        lastnameOfContact: '',
        mailOfContact: '',
        jobtitleOfContact: '',
        companyOfContact: '',
        question: '',
        message: ''
    });

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [errors, setErrors] = useState<Partial<NewMessageType>>({});
    
    const validateForm = (): boolean => {
        const newErrors: Partial<NewMessageType> = {};
          
        if (!contactFormInput.firstnameOfContact) newErrors.firstnameOfContact = 'Firstname is required';
        if (!contactFormInput.lastnameOfContact) newErrors.lastnameOfContact = 'Lastname is required';
        if (!contactFormInput.mailOfContact) newErrors.mailOfContact = 'Email address is required';
        else if (!validator.isEmail(contactFormInput.mailOfContact)) newErrors.mailOfContact = 'Email address is invalid';
        if (!contactFormInput.question) newErrors.question = 'Question is required';
        if (!contactFormInput.message) newErrors.message = 'Message is required';
          
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const onSend = async () => {
        if (validateForm()) {
            try {
                await addNewMessage( 
                    contactFormInput as NewMessageType
                );
    
                setSuccess(true);
                setContactFormInput(() => ({
                    firstnameOfContact: '',
                    lastnameOfContact: '',
                    jobtitleOfContact: '',
                    companyOfContact: '',
                    mailOfContact: '',
                    question: '',
                    message: ''
                }));
    
                await new Promise(resolve => {
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000);
                });
            } catch (error) {
                setFailure(true);

                await new Promise(resolve => {
                    setTimeout(() => {
                        setFailure(false);
                    }, 5000);
                });
            }
        }
    }

    const onFirstnameChange = (firstname: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          firstnameOfContact: firstname
        }));
    };

    const onLastnameChange = (lastname: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          lastnameOfContact: lastname
        }));
    };

    const onJobtitleChange = (jobtitle: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          jobtitleOfContact: jobtitle
        }));
    };

    const onCompanyChange = (company: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          companyOfContact: company
        }));
    }

    const onMailChange = (mail: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          mailOfContact: mail
        }));
    };

    const onQuestionChange = (selectedQuestion: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          question: selectedQuestion
        }));
    };

    const onMessageChange = (updatedMessage: string) => {
        setContactFormInput((prevState) => ({
          ...prevState,
          message: updatedMessage
        }));
    };

    return (  
        <Box display="flex" flexDirection="column" height="50vh" alignItems="center" margin={5}>
            {success && <Box sx={{border: 1, borderColor: 'success.main', borderRadius: 3,marginBottom:2, padding: 2, backgroundColor: 'success.light'
            }}><p>Message send successfully!</p></Box>}
            {failure && <Box sx={{border: 1, borderColor: '#d32f2f', borderRadius: 3,marginBottom:2, padding: 2, backgroundColor: '#d32f2f'
            }}><p>Failed to send message!</p></Box>}
            <Paper elevation={3} sx={{padding:'16px'}}>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    
                    <TextField
                        id="firstname"
                        label="Firstname"
                        fullWidth
                        value={contactFormInput.firstnameOfContact}
                        onChange={(e) => onFirstnameChange(e.target.value)}
                        required
                        error={Boolean(errors.firstnameOfContact)}
                        helperText={errors.firstnameOfContact}
                    />
                    <TextField
                        id="lastname"
                        label="Lastname"
                        fullWidth
                        value={contactFormInput.lastnameOfContact}
                        onChange={(e) => onLastnameChange(e.target.value)}
                        required
                        error={Boolean(errors.lastnameOfContact)}
                        helperText={errors.lastnameOfContact}
                    />
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    <TextField
                        id="job title"
                        label="job title"
                        fullWidth
                        value={contactFormInput.jobtitleOfContact}
                        onChange={(e) => onJobtitleChange(e.target.value)}
                        error={Boolean(errors.jobtitleOfContact)}
                        helperText={errors.jobtitleOfContact}
                    />
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    <TextField
                        id="company"
                        label="company"
                        fullWidth
                        value={contactFormInput.companyOfContact}
                        onChange={(e) => onCompanyChange(e.target.value)}
                        error={Boolean(errors.companyOfContact)}
                        helperText={errors.companyOfContact}
                    />
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    <TextField
                        id="mail"
                        label="email-address"
                        fullWidth
                        value={contactFormInput.mailOfContact}
                        onChange={(e) => onMailChange(e.target.value)}
                        required
                        error={Boolean(errors.mailOfContact)}
                        helperText={errors.mailOfContact}
                    />
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel 
                        id="questionSelect"
                        error={Boolean(errors.question)}
                        >Your question</InputLabel>
                        <Select fullWidth
                            labelId="questionSelect"
                            id="questionSelect"
                            label="Your question"
                            value={contactFormInput.question} 
                            onChange={(e) => onQuestionChange(e.target.value)} 
                            required
                            error={Boolean(errors.question)}

                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Job offer">Job Offer</MenuItem>
                        </Select>
                        {errors.question && <FormHelperText sx={{ color: '#d32f2f' }}>{errors.question}</FormHelperText>}
                    </FormControl>
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2} paddingBottom={2}>
                    <TextField
                        label="Message"
                        fullWidth
                        value={contactFormInput.message}
                        multiline
                        onChange={(e) => onMessageChange(e.target.value)}
                        required
                        error={Boolean(errors.message)}
                        helperText={errors.message}
                    />
                </Box>
                <Box display="flex" maxWidth={500} width={1} columnGap={2}>

                    <ReCAPTCHA 
                        sitekey= {process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
                        onChange={() => setCaptchaSuccess(true)} 
                        onExpired={() => setCaptchaSuccess(false)}
                        onError={() => setCaptchaSuccess(false)}
                    />

                    {captchaSuccess && <Button variant="contained"
                        endIcon={<SendIcon/>} 
                        onClick={onSend}
                        fullWidth>
                        SEND
                    </Button>}
                </Box>
            </Paper>
        </Box>
    );
}