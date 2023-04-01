import { BackToMainButton } from "@/components/back-to-main-button";
import { DevicesTable } from "@/components/devices-table";
import { gatewayService } from "@/services/gateway-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const GatewayDetail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error, isLoading } = useQuery({
        queryKey: ["gateway", id],
        enabled: router.isReady,
        queryFn: () => gatewayService.get(id as string),
    });

    if (isLoading) return <>{"Loading..."}</>;

    if (error) return <>{"An error has occurred: " + error}</>;

    if (!data) return <>{"Data does not exist."}</>;

    return (
        <>
            <Head>
                <title>Master Devices / Gateway {data.name}</title>
            </Head>

            <BackToMainButton />

            <div className="tabs is-centered">
                <ul>
                    <li className="is-active">
                        <Link href={`/gateway/${id}`}>Gateway info</Link>
                    </li>
                    <li>
                        <Link href={`/gateway/${id}/link`}>Link devices</Link>
                    </li>
                </ul>
            </div>

            <div className="box content my-4">
                <p>
                    <b>Name:</b> {data.name}
                </p>
                <p>
                    <b>Serial number:</b> {data.serial_number}
                </p>
                <p>
                    <b>IP address:</b> {data.ip_address}
                </p>
                <DevicesTable devices={data.devices} canUnlink />
            </div>
        </>
    );
};

export default GatewayDetail;
