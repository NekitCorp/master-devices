import { BackToMainButton } from "@/components/back-to-main-button";
import { DevicesTable } from "@/components/devices-table";
import { deviceService } from "@/services/device-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const GatewayLinkDevices: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["free-devices"],
        queryFn: () => deviceService.list({ free: true }),
    });

    if (isLoading) return <>{"Loading..."}</>;

    if (error) return <>{"An error has occurred: " + error}</>;

    if (!data || typeof id !== "string") return <>{"Data does not exist."}</>;

    return (
        <>
            <Head>
                <title>Master Devices / Gateway link devices</title>
            </Head>

            <BackToMainButton />

            <div className="tabs is-centered">
                <ul>
                    <li>
                        <Link href={`/gateway/${id}`}>Gateway info</Link>
                    </li>
                    <li className="is-active">
                        <Link href={`/gateway/${id}/link`}>Link devices</Link>
                    </li>
                </ul>
            </div>

            <div className="box content my-4">
                <h1 className="title">Available unlinked devices</h1>
                <DevicesTable devices={data} linkToDevice={id} refetch={refetch} />
            </div>
        </>
    );
};

export default GatewayLinkDevices;
