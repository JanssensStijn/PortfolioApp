import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { firebaseDB } from './config';
import { MessageDetailsType, NewMessageType } from './messageTypes';
import { v4 as uuidv4 } from 'uuid';

export const addNewMessage = (newmessage: NewMessageType) => {
    const id = uuidv4();
    setDoc(doc(firebaseDB, "messages", id),{
        id:id ,
        createdAt: Timestamp.fromDate(new Date()),
        firstnameOfContact: newmessage.firstnameOfContact,
        lastnameOfContact: newmessage.lastnameOfContact,
        jobtitleOfContact: newmessage.jobtitleOfContact ?? "",
        companyOfContact: newmessage.companyOfContact ?? "",
        mailOfContact: newmessage.mailOfContact,
        question: newmessage.question,
        message: newmessage.message,
        status: "unread",
        handeled: false
    });
}

export const toggleReadStatus = (message: MessageDetailsType) => {
    setDoc(doc(firebaseDB, "messages", message.id),{
        id: message.id,
        createdAt: message.createdAt,
        firstnameOfContact: message.firstnameOfContact,
        lastnameOfContact: message.lastnameOfContact,
        jobtitleOfContact: message.jobtitleOfContact,
        companyOfContact: message.companyOfContact,
        mailOfContact: message.mailOfContact,
        question: message.question,
        message: message.message,
        handeled: message.handeled,
        status: {"unread": "read", "read": "unread"}[message.status]
    });
}

export const toggleHandeledStatus = (message: MessageDetailsType) => {
    let statusOfMessage = ""
    if(!message.handeled) statusOfMessage = "read"
    else statusOfMessage = message.status
    setDoc(doc(firebaseDB, "messages", message.id),{
        id: message.id,
        createdAt: message.createdAt,
        firstnameOfContact: message.firstnameOfContact,
        lastnameOfContact: message.lastnameOfContact,
        jobtitleOfContact: message.jobtitleOfContact,
        companyOfContact: message.companyOfContact,
        mailOfContact: message.mailOfContact,
        question: message.question,
        message: message.message,
        status: statusOfMessage,
        handeled: !message.handeled
    });
}

export const deleteMessage = (message: MessageDetailsType) => {
    deleteDoc(doc(firebaseDB, "messages", message.id));
}