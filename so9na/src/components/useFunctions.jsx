import React from "react";
export const useFunctions = () => {
    const lockScroll = () => {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "";
    };

    const unlockScroll = () => {
        const scrollBarCompensation =
            window.innerWidth - document.body.offsetWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarCompensation}px`;
    };

    const scrolltotop = () => {
        window.scrollTo(0, 0);
    };

    return { lockScroll, unlockScroll, scrolltotop };
};
