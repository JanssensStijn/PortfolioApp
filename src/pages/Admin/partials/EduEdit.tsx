import { FC, useEffect, useState } from "react";
import {Paper, TextField, Fab } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Delete, Save } from "@mui/icons-material";
import { deleteEducation, updateEducation } from "../../../firebase/DataChanges";
import { Education } from "../../../firebase/DataTypes";

type EduEditProps = {
    data?: Education[];
};

type OrderedEducation = Education & { order: number };

export const EduEdit: FC<EduEditProps> = ({ data }) => {
    const [educations, setEducations] = useState<OrderedEducation[]>([]);

    useEffect(() => {
        const updatedEducations = data
          ?.sort((a, b) => b.yearOfStart - a.yearOfStart)
          .map<OrderedEducation>((education, index) => ({ ...education, order: index }));
    
        /*console.log("updatedEducations", updatedEducations);*/
    
        setEducations(updatedEducations || []);
    }, [data]);

    const updateSingleEducation = (education: OrderedEducation) => {
        const filteredEducations = educations.filter((edu) => edu.id !== education.id);
        const updatedEducations = [...filteredEducations, education].sort(
          (a, b) => a.order - b.order
        );
        setEducations(updatedEducations);
    };

    const handleSchoolChange = (education: OrderedEducation, school: string) => {
        updateSingleEducation({ ...education, school });
    };

    const handleCourseChange = (education: OrderedEducation, course: string) => {
        updateSingleEducation({ ...education, course });
    };

    const handleYearOfStartChange = (education: OrderedEducation, yearOfStart: number) => {
        updateSingleEducation({ ...education, yearOfStart });
    };

    const handleYearOfEndChange = (education: OrderedEducation, yearOfEnd: number) => {
        updateSingleEducation({ ...education, yearOfEnd });
    };

    const handleLogoUrlChange = (education: OrderedEducation, logoUrl: string) => {
        updateSingleEducation({ ...education, logoUrl });
    };


    return (
        <>
            {educations?.map((education: any) => (
                <Grid key={education.id} sm={12} md={8} lg={6} marginLeft={'auto'} marginRight={'auto'}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Grid container width={'100%'}  >
                            <Grid container width={'80%'} rowGap={2} columnGap={'2%'}>
                                <Grid  width={'100%'}>
                                    <TextField
                                        label="School"
                                        variant="outlined"
                                        value={education.school}
                                        fullWidth
                                        onChange={(e) => 
                                            handleSchoolChange(education, e.target.value)}
                                    />
                                </Grid>
                                <Grid width={'100%'}>
                                    <TextField
                                        label="Course"
                                        variant="outlined"
                                        value={education.course}
                                        fullWidth
                                        onChange={(e) => 
                                            handleCourseChange(education, e.target.value)}
                                    />
                                </Grid>
                                <Grid width={'49%'}>
                                    <TextField
                                        label="Start year"
                                        variant="outlined"
                                        value={education.yearOfStart}
                                        fullWidth
                                        onChange={(e) => 
                                            handleYearOfStartChange(education, Number(e.target.value))}
                                    />
                                </Grid>
                                <Grid width={'49%'}>
                                    <TextField
                                        label="End year"
                                        variant="outlined"
                                        value={education.yearOfEnd}
                                        fullWidth
                                        type="number"
                                        onChange={(e) => 
                                            handleYearOfEndChange(education, Number(e.target.value))}
                                    />
                                </Grid>
                            </Grid>
                            <Grid width={'15%'} margin={'auto'}>
                                <Fab color="success" 
                                    onClick={() => updateEducation(education)}
                                    sx={{margin: '15px'}}>
                                    <Save />
                                </Fab>
                                <Fab color="error"
                                    onClick={() => deleteEducation(education)}
                                    sx={{margin: '15px'}}>
                                    <Delete />
                                </Fab>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" >
                            <Grid width={'100%'} marginTop={2}>
                                <TextField
                                    label="url of logo"
                                    variant="outlined"
                                    value={education.logoUrl}
                                    fullWidth
                                    onChange={(e) => 
                                        handleLogoUrlChange(education, e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </>
    );
}
