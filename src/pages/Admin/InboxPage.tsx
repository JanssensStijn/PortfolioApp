import { Box, Typography } from "@mui/material";
import { Messages } from "./partials/Messages";
import { useMessagesContext } from "../../providers/messageProvider";
import { MessageDetailsType } from "../../firebase/messageTypes";

export const InboxPage = () => {

    const data = useMessagesContext().messages;
    const allMessages = data ? data
        .sort((a: MessageDetailsType, b: MessageDetailsType) => {
            if(a.handeled === b.handeled) { 
                return((b.createdAt).toMillis() - (a.createdAt).toMillis())
            } 
            return a.handeled?1:-1
        }) : [];

    return (
        <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Inbox</Typography>
            {(!allMessages || allMessages.length === 0) && <Typography variant="h5">No messages in Inbox</Typography>}
            {allMessages && allMessages.length > 0 && <Messages messages={allMessages}/>}
        </Box>
    );
}