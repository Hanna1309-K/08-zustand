import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

type Props = {
    children: ReactNode;
    sidebar?: ReactNode; // ❗ MUST be optional
};

export default function Layout({ children, sidebar }: Props) {
    return (
        <div className={css.container}>
            {sidebar}

            <main className={css.notesWrapper}>
                {children}
            </main>
        </div>
    );
}