import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

export const SocialIcon = (props: {icon: ReactNode, link: string, open: boolean, label: string}) => {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer" 
            style={{textDecoration: "none", color: "inherit"}}>
                
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: props.open ? "initial" : "center",
                    px: 2.5,
                    }}
                >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: props.open ? 3 : "auto",
                        justifyContent: "center",
                        color: 'var(--drawerColor)',
                    }}
                >
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.label}sx={{ opacity: props.open ? 1 : 0, color: 'var(--drawerColor)' }} />
            </ListItemButton>
            </ListItem>
        </a>
    );
}