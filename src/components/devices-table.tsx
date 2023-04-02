import { deviceService } from "@/services/device-service";
import type { Device } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { ConfirmationModal } from "./confirmation-modal";
import Link from "next/link";
import { Loader } from "./loader";

type DevicesTableProps = {
    devices: Device[];
    short?: boolean;
    canUnlink?: boolean;
    canDelete?: boolean;
    linkToDevice?: string;
    loading?: boolean;
    refetch?: () => void;
};

type Action = { type: "link"; id: string } | { type: "unlink"; id: string } | { type: "delete"; id: string };

const confirmMessageByAction: Record<Action["type"], string> = {
    link: "Are you sure you want to link the device?",
    unlink: "Are you sure you want to unlink the device?",
    delete: "Are you sure you want to delete the device?",
};

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices, short, canUnlink, canDelete, linkToDevice, loading, refetch }) => {
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
    const error = unlinkMutation.error || linkMutation.error || deleteMutation.error;

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
        <div className="is-relative">
            <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        {!short && <th>#</th>}
                        <th>Device UID</th>
                        {!short && <th>Vendor</th>}
                        {!short && <th>Created</th>}
                        {!short && <th>Gateway ID</th>}
                        <th>Status</th>
                        {hasActions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device, i) => (
                        <tr key={device.id}>
                            {!short && <td>{i + 1}</td>}
                            <td>{device.uid}</td>
                            {!short && <td>{device.vendor}</td>}
                            {!short && <td>{new Date(device.created).toLocaleString()}</td>}
                            {!short && (
                                <td>
                                    {device.gateway_id ? <Link href={`/gateway/${device.gateway_id}`}>{device.gateway_id.toString()}</Link> : "–"}
                                </td>
                            )}
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

            {error ? <div className="notification is-danger is-light">{`${error}`}</div> : null}
            {loading && <Loader />}

            <ConfirmationModal
                open={Boolean(confirmAction)}
                message={confirmMessageByAction[confirmAction?.type ?? "link"]}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
};
