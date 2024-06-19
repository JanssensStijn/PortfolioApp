import { Timestamp } from "firebase/firestore";

export type MessageDetailsType = {
    id: string;
    firstnameOfContact: string;
    lastnameOfContact: string;
    companyOfContact: string;
    jobtitleOfContact: string;
    mailOfContact: string;
    message: string;
    question: string;
    status: string;
    createdAt: Timestamp;
    handeled: boolean;
};

export type NewMessageType = {
    firstnameOfContact: string,
    lastnameOfContact: string,
    jobtitleOfContact: string,
    companyOfContact: string,
    mailOfContact: string,
    question: string,
    message: string
};

export type MessagesType = {
    messages: MessageDetailsType[];
}