import I1 from "../img/i1.png";
import F1 from "../img/f1.png";
import C3 from "../img/c3.png";
import Fi1 from "../img/fi1.png";

export const heroData = [
    {
        id: 1,
        name: "Ice Cream ",
        desc: "Chocolate & Vanilla ",
        price: 5.25,
        img: I1,
    },
    {
        id: 2,
        name: "Strawberries",
        desc: "Fresh Strawberries ",
        price: 6.99,
        img: F1,
    },
    {
        id: 3,
        name: "Chicken Kebab",
        desc: "Mixed Kebab Plate ",
        price: 15.5,
        img: C3,
    },
    {
        id: 4,
        name: "Fish Platter",
        desc: "Mixed Fish Platter ",
        price: 12.99,
        img: Fi1,
    },
];

export const categories = [
    { id: 1, name: "Chicken", urlParamName: "chicken" },
    { id: 2, name: "Curry", urlParamName: "curry" },
    { id: 3, name: "Rice", urlParamName: "rice" },
    { id: 4, name: "Fish", urlParamName: "fish" },
    { id: 5, name: "Fruits", urlParamName: "fruits" },
    { id: 6, name: "Icecreams", urlParamName: "icecreams" },
    { id: 7, name: "Soft drinks", urlParamName: "drinks" },
];
