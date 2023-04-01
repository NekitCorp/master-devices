import type { Gateway } from "@/stores";
import { useState } from "react";
import { ConfirmationModal } from "../confirmation-modal";
import { Loader } from "../loader";
import { GatewayCard } from "./gateway-card";

type GatewayCardsProps = {
    gateways: Gateway[] | undefined;
    error: unknown;
    loading: boolean;
    onDelete: (id: string) => Promise<unknown>;
};

export const GatewayCards: React.FC<GatewayCardsProps> = ({ gateways = [], error, loading, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    if (error) {
        return <div className="notification is-danger is-light">An error has occurred: {`${error}`}</div>;
    }

    if (!gateways && !loading) {
        return <div className="notification is-danger is-light">Data does not exist.</div>;
    }

    return (
        <>
            <div className="columns is-multiline is-relative">
                {gateways.map((gateway) => (
                    <GatewayCard key={gateway.id} gateway={gateway} onDelete={setConfirmDelete} />
                ))}

                {loading && <Loader />}
            </div>

            <ConfirmationModal
                open={Boolean(confirmDelete)}
                message={`Are you sure want to delete gateway ${confirmDelete}?`}
                onClose={() => setConfirmDelete(null)}
                onConfirm={() => onDelete(confirmDelete!)}
            />
        </>
    );
};
