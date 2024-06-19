import { Box, Typography, CircularProgress } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SkillGrid } from './partials/SkillGrid';
import { collection, orderBy, query } from 'firebase/firestore';
import { firebaseDB } from '../../firebase/config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const SkillsPage = () => {
    const collectionId = collection(firebaseDB, "skills");
    const queryItem = query(collectionId, orderBy("name"));
    const [data, loading, error] = useCollectionData(queryItem);

    const allCategories = data?.map((skill: any) => skill.category)
  .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
  .filter((category: any) => category !== undefined).sort();
    return (
        <>
            {loading && <CircularProgress color="success"/>}
            {error && <p>Something went wrong</p>}
            <Box textAlign="center" alignItems="center" width={"80vw"} marginLeft={"auto"} marginRight={"auto"}>
                <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Skills</Typography>
                {allCategories?.map((category) => (
                    <Accordion key={category} elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: 'var(--componentBackgroundColor)'}}>
                            {category}
                        </AccordionSummary>
                        <AccordionDetails sx={{backgroundColor:'var(--mainBackgroundColor)'}}>
                            <SkillGrid category={category} data={data}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </>
    );
};