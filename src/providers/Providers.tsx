import { FC, ReactNode } from "react";
import { SkillProvider } from "./skillProvider";
import { EducationProvider } from "./educationProvider";
import { PersonalProvider } from "./personalProvider";
import { MessageProvider } from "./messageProvider";
import { UserProvider } from "./userProvider";
import { ProjectProvider } from "./projectProvider";

export const Providers: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <UserProvider>
            <SkillProvider>
                <EducationProvider>
                    <PersonalProvider>
                        <MessageProvider>
                            <ProjectProvider>
                            {children}
                            </ProjectProvider>
                        </MessageProvider>
                    </PersonalProvider>
                </EducationProvider>
            </SkillProvider>
        </UserProvider>
    );
}