import { FC, useEffect, useState } from "react";
import { Personal } from "../../../firebase/DataTypes";
import { Button, Fab, Paper, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Save } from "@mui/icons-material";
import { updatePersonal } from "../../../firebase/DataChanges";

type PersonalEditProps = {
    data?: Personal;
};

export const PersonalEdit: FC<PersonalEditProps> = ({data}) => {

    const [personal, setPersonal] = useState<Personal>({
        id: '',
        firstName: '',
        lastName: '',
        jobtitle: '',
        cellphone: '',
        mail: '',
        pictureUrl: '',
        github: '',
        linkedin: '',
        bio: '',
        intro: ''
    });

    useEffect(() => {
        setPersonal(data || {
            id: '',
            firstName: '',
            lastName: '',
            jobtitle: '',
            cellphone: '',
            mail: '',
            pictureUrl: '',
            github: '',
            linkedin: '',
            bio: '',
            intro: ''
        });
    }, [data]);
  
    const onFirstnameChange = (firstname: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          firstName: firstname
        }));
    };
  
    const onLastnameChange = (lastname: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          lastName: lastname
        }));
    };

    const onJobtitleChange = (jobtitle: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          jobtitle: jobtitle
        }));
    };

    const onCellphoneChange = (cellphone: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          cellphone: cellphone
        }));
    };

    const onMailChange = (mail: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          mail: mail
        }));
    };

    const onPictureUrlChange = (pictureUrl: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          pictureUrl: pictureUrl
        }));
    };

    const onGithubChange = (github: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          github: github
        }));
    };

    const onLinkedinChange = (linkedin: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          linkedin: linkedin
        }));
    };

    const onBioChange = (bio: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          bio: bio
        }));
    };

    const onIntroChange = (intro: string) => {
        setPersonal((prevState) => ({
          ...prevState,
          intro: intro
        }));
    }

    return (
        <Grid key={personal.id} sm={12} md={8} lg={6} marginLeft={'auto'} marginRight={'auto'}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Grid container width={'100%'}  >
                    <Grid container width={'80%'} rowGap={2} columnGap={'2%'}>
                        <Grid  width={'49%'}>
                            <TextField
                                label="First name"
                                variant="outlined"
                                value={personal.firstName}
                                fullWidth
                                onChange={(e) => onFirstnameChange(e.target.value)}
                            />
                        </Grid>
                        <Grid width={'49%'}>
                            <TextField
                                label="Last name"
                                variant="outlined"
                                value={personal.lastName}
                                fullWidth
                                onChange={(e) => onLastnameChange(e.target.value)}
                            />
                        </Grid>
                        <Grid width={'49%'}>
                            <TextField
                                label="Job title"
                                variant="outlined"
                                value={personal.jobtitle}
                                fullWidth
                                onChange={(e) => onJobtitleChange(e.target.value)}
                            />
                        </Grid>
                        <Grid width={'49%'}>
                            <TextField
                                label="Cellphone number"
                                variant="outlined"
                                value={personal.cellphone}
                                fullWidth
                                onChange={(e) => onCellphoneChange(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid width={'15%'} margin={'auto'}>
                        <Button variant="contained"
                            color="success"
                            onClick={() => updatePersonal(personal)} 
                            startIcon={<Save/>}>
                            Save changes
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" >
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="email-address"
                            variant="outlined"
                            value={personal.mail}
                            fullWidth
                            onChange={(e) => onMailChange(e.target.value)}
                        />
                    </Grid>
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="url of profile picture"
                            variant="outlined"
                            value={personal.pictureUrl}
                            fullWidth
                            onChange={(e) => onPictureUrlChange(e.target.value)}
                        />
                    </Grid>
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="link to GitHub profile"
                            variant="outlined"
                            value={personal.github}
                            fullWidth
                            onChange={(e) => onGithubChange(e.target.value)}
                        />
                    </Grid>
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="link to LinkedIn profile"
                            variant="outlined"
                            value={personal.linkedin}
                            fullWidth
                            onChange={(e) => onLinkedinChange(e.target.value)}
                        />
                    </Grid>
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="intro"
                            variant="outlined"
                            value={personal.intro}
                            fullWidth
                            onChange={(e) => onIntroChange(e.target.value)}
                        />
                    </Grid>
                    <Grid width={'100%'} marginTop={2}>
                        <TextField
                            label="biography"
                            variant="outlined"
                            value={personal.bio}
                            fullWidth
                            multiline
                            onChange={(e) => onBioChange(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}