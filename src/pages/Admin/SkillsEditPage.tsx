import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, Typography } from "@mui/material";
import { SkillsEdit } from "./partials/SkillsEdit";
import { Add, ExpandMore } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { addNewSkill } from "../../firebase/DataChanges";
import { useSkillContext } from "../../providers/skillProvider";

export const SkillsEditPage = () => {
    const data = useSkillContext().skills;

    const allCategories = data?.map((skill: any) => skill.category)
  .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
  .filter((category: any) => category !== undefined).sort();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Edit skills</Typography>
            {allCategories && allCategories.map((category: any) => (
                <Accordion 
                    key={category}
                    expanded={expanded === category}
                    onChange={handleChange(category)}
                    sx={{minWidth: '80vw'}}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        
                        <Typography variant="h6" 
                            sx={{
                                textAlign: 'left',
                                color: 'var(--secondaryColor)', 
                                marginBottom:"20px", 
                                width: '50%', 
                                flexShrink: 0 
                            }}>{category}
                        </Typography>
                        <Fab color="primary"
                            onClick={() => {addNewSkill(category)}}>
                            <Add />
                        </Fab>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SkillsEdit category={category} data={data}/>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}