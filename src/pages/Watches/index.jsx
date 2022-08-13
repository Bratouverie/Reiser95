import React from 'react';

import About from "../../components/About";
import BrandBg from "../../components/BrandBg";
import ImgBlock from "../../components/ImgBlock";

const data = [
    {
        path: "/assets/img/watch1.jpg",
    },
    {
        path: "/assets/img/watch2.jpg",
    },
    {
        path: "/assets/img/watch3.jpg",
    },
    {
        path: "/assets/img/watch4.jpeg",
    },
    {
        path: "/assets/img/watch5.jpeg",
    },
    {
        path: "/assets/img/watch6.png",
    },
    {
        path: "/assets/img/watch7.jpeg",
    }
];

const title = "NFT Watches Certificates";
const text = "Explore collections of brand certificates. Use the opportunity to get an NFT certificate for your branded item. Buy and sell NFTs tied to real-life branded items. The value of such things is greater, and the value of NFTs is more meaningful. Below are collections of NFT-certificates of top brands of clothing, watches, cars and alcohol. All of them are located on OpenSea and are available for viewing and purchase. If you would like to create your own NFT certificate, go through the authentication process of your branded item and mint the NFT on our platform. But remember that the number of certificates of each brand is always limited. We wish you success in exploring the new possibilities of NFT.";

const Watches = () => {
    return(
        <>
            <BrandBg src="/assets/img/watch-bg.jpg" />

            <About title={title} text={text} />

            <ImgBlock title="Choose Brand" data={data} />
        </>
    )
}

export default Watches;