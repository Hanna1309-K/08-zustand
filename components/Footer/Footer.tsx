import css from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <p>© {new Date().getFullYear()} NoteHub</p>
            <p>Developer: Your Name</p>
            <a href="mailto:student@notehub.app">
                student@notehub.app
            </a>
        </footer>
    );
}