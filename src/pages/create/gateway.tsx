import { BackToMainButton } from "@/components/back-to-main-button";
import { useForm } from "@/hooks/use-form";
import { gatewayService } from "@/services/gateway-service";
import type { NextPage } from "next";
import Head from "next/head";

const CreateGateway: NextPage = () => {
    const { handleSubmit, error, loading } = useForm(gatewayService.create, "/");

    return (
        <>
            <Head>
                <title>Master Devices / Create Gateway</title>
            </Head>

            <BackToMainButton />

            <form className="box my-4" onSubmit={handleSubmit}>
                <h1 className="title">Create Gateway</h1>

                <div className="field">
                    <label className="label" htmlFor="serial_number">
                        Unique serial number
                    </label>
                    <div className="control">
                        <input
                            disabled={loading}
                            id="serial_number"
                            name="serial_number"
                            className="input"
                            type="text"
                            required
                            placeholder="01234567-89ABCDEF-01234567-89ABCDEF"
                            pattern="[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}"
                            title="Number should be in four groups of eight characters each, separated by hyphens. Each character in the string must be either an uppercase letter (A to Z) or a digit (0 to 9)."
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="name">
                        Human-readable name
                    </label>
                    <div className="control">
                        <input disabled={loading} id="name" name="name" className="input" type="text" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="ip_address">
                        IP address
                    </label>
                    <div className="control">
                        <input
                            disabled={loading}
                            id="ip_address"
                            name="ip_address"
                            className="input"
                            type="text"
                            required
                            placeholder="192.168.1.1"
                            pattern="(\d{1,3}\.){3}\d{1,3}"
                            title="IPv4 address (dotted decimal notation)."
                        />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button disabled={loading} className={`button is-link ${loading ? "is-loading" : ""}`}>
                            Submit
                        </button>
                    </div>
                </div>

                {error && <div className="notification is-danger is-light">{error}</div>}
            </form>
        </>
    );
};

export default CreateGateway;
