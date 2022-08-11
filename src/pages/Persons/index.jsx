import React from "react";

import About from "../../components/About";
import BrandBg from "../../components/BrandBg";
import ImgBlock from "../../components/ImgBlock";

const data = [
    {
        path: "/assets/img/person1.png",
    },
    {
        path: "/assets/img/person2.png",
    },
    {
        path: "/assets/img/person3.png",
    },
    {
        path: "/assets/img/person4.png",
    },
    {
        path: "/assets/img/person5.png",
    },
    {
        path: "/assets/img/person6.png",
    },
    {
        path: "/assets/img/person7.png",
    },
    {
        path: "/assets/img/person8.png",
    },
    {
        path: "/assets/img/person9.png",
    },
];

const Persons = () => {
    return (
        <>
            <BrandBg />

            <About />

            <ImgBlock title="Trending in Person" data={data} />
        </>
    );
};

export default Persons;
