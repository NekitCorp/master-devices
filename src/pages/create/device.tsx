import { BackToMainButton } from "@/components/back-to-main-button";
import { useForm } from "@/hooks/use-form";
import { deviceService } from "@/services/device-service";
import type { NextPage } from "next";
import Head from "next/head";

const CreateDevice: NextPage = () => {
    const { handleSubmit, error, loading } = useForm(deviceService.create, "/devices");

    return (
        <>
            <Head>
                <title>Master Devices / Create Device</title>
            </Head>

            <BackToMainButton />

            <form className="box my-4" onSubmit={handleSubmit}>
                <h1 className="title">Create Device</h1>

                <div className="field">
                    <label className="label" htmlFor="uid">
                        UID
                    </label>
                    <div className="control">
                        <input disabled={loading} id="uid" name="uid" className="input" type="number" required placeholder="1234" />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="vendor">
                        Vendor
                    </label>
                    <div className="control">
                        <input disabled={loading} id="vendor" name="vendor" className="input" type="text" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="status">
                        Status
                    </label>
                    <div className="control">
                        <div className="select">
                            <select disabled={loading} defaultValue="online" id="status" name="status">
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
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

export default CreateDevice;
