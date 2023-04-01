import Link from "next/link";

type TabLinksProps = {
    tabs: { href: string; title: string; active: boolean }[];
};

export const TabLinks: React.FC<TabLinksProps> = ({ tabs }) => {
    return (
        <div className="tabs is-centered">
            <ul>
                {tabs.map((tab) => (
                    <li key={tab.href} className={tab.active ? "is-active" : ""}>
                        <Link href={tab.href}>{tab.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
