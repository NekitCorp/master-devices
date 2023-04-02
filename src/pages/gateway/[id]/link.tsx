import { BackToMainButton } from "@/components/back-to-main-button";
import { DevicesTable } from "@/components/devices-table";
import { Loader } from "@/components/loader";
import { deviceService } from "@/services/device-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const GatewayLinkDevices: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const {
        data = [],
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["free-devices"],
        queryFn: () => deviceService.list({ free: true }),
    });

    if (error) {
        return <div className="notification is-danger is-light">An error has occurred: {`${error}`}</div>;
    }

    if (typeof id !== "string") {
        return <div className="notification is-danger is-light">Wrong id type: {id}.</div>;
    }

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

            <div className="box content my-4 is-relative">
                <h1 className="title">Available unlinked devices</h1>
                <DevicesTable devices={data} linkToDevice={id} refetch={refetch} />
                {(isLoading || isFetching) && <Loader />}
            </div>
        </>
    );
};

export default GatewayLinkDevices;
