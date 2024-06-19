import { Paper, Rating, Tooltip } from "@mui/material";
import { FC } from "react";

type SkillPaperProps = {
    name: string;
    image: string;
    rating?: number;
}

export const SkillPaper: FC<SkillPaperProps> = ({ name, image, rating}) => {
    const noRating = rating !== undefined && rating !== 0  && rating !== null;
    return (
            <Paper elevation={4} sx={{ width: "100%", padding: "15px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Tooltip title={name} arrow>
                    <img src={image} alt={name} style={{ width: "100%", height: "auto" }}/>
                </Tooltip>
                {noRating && <Rating readOnly max={5} value={rating}/>}
            </Paper>
    );
}