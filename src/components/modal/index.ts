import dynamic from "next/dynamic";

export const Modal = dynamic(() => import("./modal"), {
    ssr: false,
});
