import { GatewayCards } from "@/components/gateway";
import { TabLinks } from "@/components/tab-links";
import { gatewayService } from "@/services/gateway-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
    const { data, error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["gateways"],
        queryFn: gatewayService.list,
    });

    const { mutateAsync } = useMutation({
        mutationFn: gatewayService.delete,
        onSuccess: () => refetch(),
    });

    return (
        <>
            <Head>
                <title>Master Devices / Gateways</title>
            </Head>
            <TabLinks
                tabs={[
                    { title: "Gateways", href: "/", active: true },
                    { title: "Devices", href: "/devices", active: false },
                ]}
            />
            <div className="block">
                <Link href="/create/gateway" className="button is-outlined">
                    <span className="icon">✚</span>
                    <span>Create gateway</span>
                </Link>
            </div>
            <GatewayCards gateways={data} error={error} loading={isLoading || isFetching} onDelete={mutateAsync} />
        </>
    );
};

export default Home;
