import { deviceService } from "@/services/device-service";
import type { Device } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ConfirmationModal } from "./confirmation-modal";

type DevicesTableProps = {
    devices: Device[];
    short?: boolean;
    canUnlink?: boolean;
    canDelete?: boolean;
    linkToDevice?: string;
    refetch?: () => void;
};

type Action = { type: "link"; id: string } | { type: "unlink"; id: string } | { type: "delete"; id: string };

const confirmMessageByAction: Record<Action["type"], string> = {
    link: "Are you sure you want to link the device?",
    unlink: "Are you sure you want to unlink the device?",
    delete: "Are you sure you want to delete the device?",
};

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices, short, canUnlink, canDelete, linkToDevice, refetch }) => {
    const [confirmAction, setConfirmAction] = React.useState<Action | null>(null);

    const unlinkMutation = useMutation({
        mutationFn: deviceService.unlink,
        onSuccess: refetch,
    });
    const linkMutation = useMutation({
        mutationFn: (deviceId: string) => deviceService.link(deviceId, linkToDevice ?? ""),
        onSuccess: refetch,
    });
    const deleteMutation = useMutation({
        mutationFn: (deviceId: string) => deviceService.delete(deviceId),
        onSuccess: refetch,
    });

    const hasActions = canUnlink || Boolean(linkToDevice) || canDelete;

    const handleConfirm = () => {
        switch (confirmAction?.type) {
            case "link":
                return linkMutation.mutateAsync(confirmAction.id);
            case "unlink":
                return unlinkMutation.mutateAsync(confirmAction.id);
            case "delete":
                return deleteMutation.mutateAsync(confirmAction.id);
            default:
                return Promise.reject();
        }
    };

    const handleCancel = () => setConfirmAction(null);

    return (
        <>
            <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>Device UID</th>
                        {!short && <th>Vendor</th>}
                        <th>Status</th>
                        {hasActions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.id}>
                            <td>{device.uid}</td>
                            {!short && <td>{device.vendor}</td>}
                            <td>
                                {device.status === "online" ? (
                                    <span className="tag is-success">online</span>
                                ) : (
                                    <span className="tag is-danger">offline</span>
                                )}
                            </td>
                            {hasActions && (
                                <td className="has-text-centered">
                                    {canUnlink && (
                                        <button
                                            title="Unlink device"
                                            className="button is-small"
                                            onClick={() => setConfirmAction({ type: "unlink", id: device.id })}
                                        >
                                            <span className="icon">💥</span>
                                        </button>
                                    )}
                                    {canDelete && (
                                        <button
                                            title="Delete device"
                                            className="button is-small"
                                            onClick={() => setConfirmAction({ type: "delete", id: device.id })}
                                        >
                                            <span className="icon">🗑️</span>
                                        </button>
                                    )}
                                    {Boolean(linkToDevice) && (
                                        <button
                                            title="Link device"
                                            className="button is-small"
                                            onClick={() => setConfirmAction({ type: "link", id: device.id })}
                                        >
                                            <span className="icon">🔗</span>
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {unlinkMutation.isError && <div className="notification is-danger is-light">{(unlinkMutation.error as Error).message}</div>}

            <ConfirmationModal
                open={Boolean(confirmAction)}
                message={confirmMessageByAction[confirmAction?.type ?? "link"]}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};
