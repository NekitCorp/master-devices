import styled from "./loader.module.css";

export const Loader: React.FC = () => {
    return (
        <div className={styled.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
