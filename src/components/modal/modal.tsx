import React from "react";
import ReactDOM from "react-dom";

export default class Modal extends React.Component<React.PropsWithChildren> {
    el: HTMLDivElement = document.createElement("div");
    modalRoot = document.getElementById("modal-root");

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        this.modalRoot?.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot?.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}
