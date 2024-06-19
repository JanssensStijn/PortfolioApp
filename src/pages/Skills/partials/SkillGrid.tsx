import { FC } from "react";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { SkillPaper } from "./SkillPaper";

type SkillGridProps = {
    data?: any;
    category: string;
}

export const SkillGrid: FC<SkillGridProps> = ({data, category}) => {
    
    const skills = data?.filter((skill: any) => skill.category === category)
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return (
        <Grid container spacing={2} columns={12}>
            {skills?.map((skill: any, index:any) => (
                skill.logoUrl !== "" && skill.name !== "" && <Grid key={index} xs={6} sm={4} md={3} lg={2}>
                    <SkillPaper name={skill.name} image={skill.logoUrl} rating={skill.rating}/>
                </Grid>
            ))}
        </Grid>
    );
}