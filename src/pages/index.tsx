import { DevicesTable } from "@/components/devices-table";
import { MainHeader } from "@/components/main-header";
import { gatewayService } from "@/services/gateway-service";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["gateways"],
        queryFn: gatewayService.list,
    });

    if (isLoading) return <>{"Loading..."}</>;

    if (error) return <>{"An error has occurred: " + error}</>;

    if (!data) return <>{"Data does not exist."}</>;

    return (
        <>
            <Head>
                <title>Master Devices / Gateways</title>
            </Head>

            <MainHeader page="gateways" />

            <div className="columns is-multiline">
                {data.map((gateway) => (
                    <div key={gateway.id} className="column is-one-third">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">{gateway.name}</p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    <p>
                                        <b>Serial number:</b> {gateway.serial_number}
                                    </p>
                                    <p>
                                        <b>IP address:</b> {gateway.ip_address}
                                    </p>
                                    <DevicesTable short devices={gateway.devices} />
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link href={`/gateway/${gateway.id}`} className="card-footer-item">
                                    🔎 Details
                                </Link>
                                <a href="#" className="card-footer-item">
                                    🗑️ Delete
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
