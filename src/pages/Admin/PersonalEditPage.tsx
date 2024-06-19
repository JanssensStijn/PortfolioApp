import { Box, CircularProgress, Typography } from "@mui/material";
import { usePersonalDataContext } from "../../providers/personalProvider";
import { PersonalEdit } from "./partials/PersonalEdit";

export const PersonalEditPage = () => {
    const {personalData, loading, error} = usePersonalDataContext();

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" 
                sx={{color: 'var(--accentColor)',
                     marginBottom:"20px"
                    }}>
                Edit personal data
            </Typography>
            {loading && <CircularProgress/>}
            {error && <Typography variant="body1" sx={{color: 'var(--errorColor)'}}>{error}</Typography>}
            {personalData && <PersonalEdit data={personalData}/>}
        </Box>
    );
}