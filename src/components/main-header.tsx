import Link from "next/link";

type MainHeaderProps = {
    page: "gateways" | "devices";
};

export const MainHeader: React.FC<MainHeaderProps> = ({ page }) => {
    return (
        <>
            <div className="buttons">
                <Link href="/create/gateway" className="button is-outlined">
                    <span className="icon">✚</span>
                    <span>Create gateway</span>
                </Link>
                <Link href="/create/device" className="button is-outlined">
                    <span className="icon">✚</span>
                    <span>Create device</span>
                </Link>
            </div>

            <div className="tabs is-centered">
                <ul>
                    <li className={page === "gateways" ? "is-active" : ""}>
                        <Link href="/">Gateways</Link>
                    </li>
                    <li className={page === "devices" ? "is-active" : ""}>
                        <Link href="/not-associated-devices">Not associated devices</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};
