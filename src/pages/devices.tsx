import { DevicesTable } from "@/components/devices-table";
import { TabLinks } from "@/components/tab-links";
import { deviceService } from "@/services/device-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Devices: NextPage = () => {
    const {
        data = [],
        error,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["devices"],
        queryFn: () => deviceService.list({}),
    });

    if (error) {
        return <div className="notification is-danger is-light">An error has occurred: {`${error}`}</div>;
    }

    return (
        <>
            <Head>
                <title>Master Devices / Devices</title>
            </Head>
            <TabLinks
                tabs={[
                    { title: "Gateways", href: "/", active: false },
                    { title: "Devices", href: "/devices", active: true },
                ]}
            />
            <div className="block">
                <Link href="/create/device" className="button is-outlined">
                    <span className="icon">✚</span>
                    <span>Create device</span>
                </Link>
            </div>
            <DevicesTable devices={data} canDelete refetch={refetch} loading={isFetching || isLoading} />
        </>
    );
};

export default Devices;
