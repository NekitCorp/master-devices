import { DevicesTable } from "@/components/devices-table";
import { MainHeader } from "@/components/main-header";
import { deviceService } from "@/services/device-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["free-devices"],
        queryFn: () => deviceService.list({ free: true }),
    });

    if (isLoading) return <>{"Loading..."}</>;

    if (error) return <>{"An error has occurred: " + error}</>;

    if (!data) return <>{"Data does not exist."}</>;

    return (
        <>
            <Head>
                <title>Master Devices / Not associated devices</title>
            </Head>

            <MainHeader page="devices" />
            <DevicesTable devices={data} />
        </>
    );
};

export default Home;
