import { BackToMainButton } from "@/components/back-to-main-button";
import { DevicesTable } from "@/components/devices-table";
import { gatewayService } from "@/services/gateway-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const GatewayDetail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, error, isLoading } = useQuery({
        queryKey: ["device", id],
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
                <DevicesTable devices={data.devices} />
            </div>
        </>
    );
};

export default GatewayDetail;
