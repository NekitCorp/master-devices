import Link from "next/link";

export const BackToMainButton: React.FC = () => {
    return (
        <Link href="/" className="button">
            <span className="icon">⬅</span>
            <span>Back</span>
        </Link>
    );
};
