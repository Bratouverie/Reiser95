import React from "react";

import About from "../../components/About";
import BrandBg from "../../components/BrandBg";
import ImgBlock from "../../components/ImgBlock";

const data = [
    {
        path: "/assets/img/brand1.png",
    },
    {
        path: "/assets/img/brand2.png",
    },
    {
        path: "/assets/img/brand3.png",
    },
    {
        path: "/assets/img/brand4.png",
    },
    {
        path: "/assets/img/brand5.png",
    },
    {
        path: "/assets/img/brand6.png",
    },
    {
        path: "/assets/img/brand7.png",
    },
    {
        path: "/assets/img/brand8.png",
    },
    {
        path: "/assets/img/brand9.png",
    },
    {
        path: "/assets/img/brand10.png",
    },
    {
        path: "/assets/img/brand11.png",
    },
    {
        path: "/assets/img/brand12.png",
    },
    {
        path: "/assets/img/brand13.png",
    },
    {
        path: "/assets/img/brand14.png",
    },
    {
        path: "/assets/img/brand15.png",
    },
    {
        path: "/assets/img/brand16.png",
    },
    {
        path: "/assets/img/brand17.png",
    },
    {
        path: "/assets/img/brand18.png",
    },
];

const Brands = () => {
    return (
        <>
            <BrandBg />

            <About />

            <ImgBlock title="Trending in Brands" data={data} />
        </>
    );
};

export default Brands;
