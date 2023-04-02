import type { Gateway } from "@/stores";
import Link from "next/link";
import { DevicesTable } from "../devices-table";

type GatewayCardProps = {
    gateway: Gateway;
    onDelete: (id: string) => void;
};

export const GatewayCard: React.FC<GatewayCardProps> = ({ gateway, onDelete }) => {
    const handleDeleteGateway = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        onDelete(gateway.id);
    };

    return (
        <div className="column is-one-third">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{gateway.name}</p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>
                            <b>Serial number:</b> {gateway.serial_number}
                        </p>
                        <p>
                            <b>IP address:</b> <span className="tag is-info is-light">{gateway.ip_address}</span>
                        </p>
                        <DevicesTable short devices={gateway.devices} />
                    </div>
                </div>
                <footer className="card-footer">
                    <Link href={`/gateway/${gateway.id}`} className="card-footer-item">
                        🔎 Details
                    </Link>
                    <a href="#" onClick={handleDeleteGateway} className="card-footer-item">
                        🗑️ Delete
                    </a>
                </footer>
            </div>
        </div>
    );
};
