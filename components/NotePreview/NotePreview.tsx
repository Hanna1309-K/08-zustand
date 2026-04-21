import { Note } from "@/types/note";

export default function NotePreview({ note }: { note: Note }) {
    return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.tag}</p>
            <small>{note.createdAt}</small>
        </div>
    );
}