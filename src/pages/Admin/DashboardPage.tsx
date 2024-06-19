import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Timestamp } from 'firebase/firestore';
import { useMessagesContext } from "../../providers/messageProvider";
import { Link, useNavigate } from "react-router-dom";
import { MessageDetailsType } from "../../firebase/messageTypes";
import { Messages } from "./partials/Messages";

export const DashboardPage = () => {
    const data = useMessagesContext().messages;
    const lastContactRequests = data 
        ? data.sort((a: MessageDetailsType, b: MessageDetailsType) => {
            if(a.handeled === b.handeled) { 
                return((b.createdAt).toMillis() - (a.createdAt).toMillis())
            } 
            return a.handeled?1:-1
        }).slice(0, 5)
        : [];

    const statistics = [
        {name: "Messages", value: data ? data.length : 0},
        {name: "Unread Messages", value: data ? data.filter((message: MessageDetailsType) => message.status === "unread").length : 0},
        {name: "General Messages", value: data ? data.filter((message: MessageDetailsType) => message.question === "General").length : 0},
        {name: "Job Offer Messages", value: data ? data.filter((message: MessageDetailsType) => message.question === "Job offer").length : 0},
    ];

    const navigate = useNavigate();

    return (
        <Box display="flex" flex={1} height={'95vh'} maxHeight={"100vh"} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Admin dashboard</Typography>
            <Grid container spacing={2} sx={{maxWidth: '80vw'}}>
                {statistics.map((statistic) => (
                    <Grid key={statistic.name} xs={6} textAlign="center">
                        <Paper elevation={5} >
                            <Typography variant="h3">{statistic.value}</Typography>
                            <Typography variant="h5">{statistic.name}</Typography>
                        </Paper>
                    </Grid>
                ))}
                
            </Grid>
            <Typography variant="h4" sx={{color: 'var(--accentColor)', marginBottom:"20px", marginTop: "20px"}}>latest contact requests</Typography>
            
            {(!lastContactRequests || lastContactRequests.length === 0) && <Typography variant="h5">No messages in Inbox</Typography>}
            {lastContactRequests && lastContactRequests.length > 0 && <Messages messages={lastContactRequests}/>}
        </Box>
    );
};