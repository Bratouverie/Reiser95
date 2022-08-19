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

const title = "Brand NFT Certificates";
const text = "Explore collections of brand certificates. Use the opportunity to get an NFT certificate for your branded item. Buy and sell NFTs tied to real-life branded items. The value of such things is greater, and the value of NFTs is more meaningful. Below are collections of NFT-certificates of top brands of clothing, watches, cars and alcohol. All of them are located on OpenSea and are available for viewing and purchase. If you would like to create your own NFT certificate, go through the authentication process of your branded item and mint the NFT on our platform. But remember that the number of certificates of each brand is always limited. We wish you success in exploring the new possibilities of NFT.";

const Brands = () => {
    return (
        <>
            <BrandBg src="/assets/img/brands-bg.png" />

            <About title={title} text={text} />

            <ImgBlock title="Choose Brand" data={data} />
        </>
    );
};

export default Brands;
