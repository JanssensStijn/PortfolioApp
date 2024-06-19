import { Dashboard, Mail, Edit, Star, School, Person, Home, Call, Map, Login} from "@mui/icons-material";
import { DashboardPage } from "../pages/Admin/DashboardPage";
import { InboxPage } from "../pages/Admin/InboxPage";
import { SkillsEditPage } from "../pages/Admin/SkillsEditPage";
import { EducationEditPage } from "../pages/Admin/EducationEditPage";
import { PersonalEditPage } from "../pages/Admin/PersonalEditPage";
import { HomePage } from "../pages/Home/HomePage";
import { SkillsPage } from "../pages/Skills/SkillsPage";
import { EducationPage } from "../pages/Education/EducationPage";
import { AboutMePage } from "../pages/AboutMe/AboutMePage";
import { ContactPage } from "../pages/Contact/ContactPage";
import { ProjectEditPage } from "../pages/Admin/projectEditPage";
import { LoginPage } from "../pages/Login/LoginPage";

export const adminPages = [
    { label: "Dashboard", route: "/Dashboard", icon: <Dashboard />, element: <DashboardPage />},
    { label: "Inbox", route: "/Inbox", icon: <Mail />, element: <InboxPage />},
    { label: "Edit details", route: "/EditSkills", icon: <><Edit /><Star /></>, element: <SkillsEditPage />},
    { label: "Edit education", route: "/EditEdu", icon: <><Edit /><School /></>, element: <EducationEditPage />},
    { label: "Edit Personal", route: "/EditPersonal", icon: <><Edit /><Person /></>, element: <PersonalEditPage />},
    { label: "Edit Projects", route: "/EditProjects", icon: <><Edit /><Map /></>, element: <ProjectEditPage />},
];

export const visitorPages = [
    { label: "Home", route: "/", icon: <Home />, element: <HomePage />},
    { label: "Skills", route: "/Skills", icon: <Star />, element: <SkillsPage/>},
    { label: "Education", route: "/Education", icon: <School />, element: <EducationPage />},
    { label: "About Me", route: "/AboutMe", icon: <Person />, element: <AboutMePage />},
    { label: "Contact", route: "/Contact", icon: <Call />, element: <ContactPage/>},
    { label: "Login", route: "/login", icon: <Login />, element: <LoginPage/>},
];