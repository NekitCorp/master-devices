import type { Device } from "@/stores";

type DevicesTableProps = {
    devices: Device[];
    short?: boolean;
};

export const DevicesTable: React.FC<DevicesTableProps> = ({ devices, short }) => {
    return (
        <table className="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>Device UID</th>
                    {!short && <th>Vendor</th>}
                    <th>Status</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
