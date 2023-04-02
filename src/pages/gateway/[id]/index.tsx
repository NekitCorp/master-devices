import { BackToMainButton } from "@/components/back-to-main-button";
import { DevicesTable } from "@/components/devices-table";
import { Loader } from "@/components/loader";
import { gatewayService } from "@/services/gateway-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const GatewayDetail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["gateway", id],
        enabled: router.isReady,
        queryFn: () => gatewayService.get(id as string),
    });

    if (error) {
        return <div className="notification is-danger is-light">An error has occurred: {`${error}`}</div>;
    }

    return (
        <>
            <Head>
                <title>Master Devices / Gateway {id}</title>
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

            <div className="box content my-4 is-relative">
                {data && (
                    <>
                        <p>
                            <b>Name:</b> {data.name}
                        </p>
                        <p>
                            <b>Serial number:</b> {data.serial_number}
                        </p>
                        <p>
                            <b>IP address:</b> <span className="tag is-info is-light">{data.ip_address}</span>
                        </p>
                        <DevicesTable devices={data.devices} canUnlink refetch={refetch} />
                    </>
                )}
                {(isLoading || isFetching) && <Loader />}
            </div>
        </>
    );
};

export default GatewayDetail;
