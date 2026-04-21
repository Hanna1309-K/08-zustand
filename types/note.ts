export type Tag =
    | "Work"
    | "Personal"
    | "Todo"
    | "Meeting"
    | "Shopping";

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: Tag; // 👈 ОБОВʼЯЗКОВО
}