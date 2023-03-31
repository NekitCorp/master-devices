import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return <main className="container is-fluid py-4">{children}</main>;
};
