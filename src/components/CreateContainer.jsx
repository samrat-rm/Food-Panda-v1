import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    MdFastfood,
    MdCloudUpload,
    MdDelete,
    MdFoodBank,
    MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useDispatch } from "react-redux";
import { setFoodItems } from "../features/foodItemsSlice";
import { getAllFoodItems } from "../utils/firebaseFunctions";

const CreateContainer = () => {
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    function uploadImage(e) {
        setIsLoading(true);
        const imageFile = e.target.files[0];

        const storageRef = ref(
            storage,
            `Images/${Date.now()}-${imageFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg("Error while uploading : try Again 🤗");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setMsg("Image Uploaded Successfully 🥳 ");
                    setAlertStatus("success");
                    setTimeout(() => {
                        setFields(false);
                    }, 4000);
                });
            }
        );
    }
    function deleteImage() {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then((response) => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg("Image Deleted Successfully  ✅ ");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    }
    function saveDetails() {
        setIsLoading(true);
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true);
                setMsg("Required fields are Empty");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title,
                    imageURL: imageAsset,
                    category,
                    calories,
                    qty: 1,
                    price,
                };
                saveItem(data); // check the firebaseFunction file
                clearData();
                setIsLoading(false);
                setFields(true);
                setMsg("Data uploaded Successfully  ✅ ");
                setAlertStatus("success");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : try Again 🤗");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);
        }
        {
            /* After saving data fetch and save the new data oncluding the new item */
        }
        dispatch(setFoodItems(getAllFoodItems()));
    }
    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    };
    return (
        <div className="w-full h-auto min-h-screen flex justify-center items-start   ">
            <div className="w-[90%] md:w-[75%] max-w-[500px] border-gray-300 border-2 rounded-lg p-4 px-5 flex flex-col items-start justify-center bg-gray-50 ">
                {fields && (
                    <motion.p
                        initial={{ opactity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lf font-semibold ${
                            alertStatus === "danger"
                                ? "bg-red-200 text-red-800 "
                                : "bg-emerald-200 text-emerald-800"
                        }`}
                    >
                        {msg}
                    </motion.p>
                )}

                <div className="w-full py-2 border-b border-gray-300 flex items-center  gap-2 max-w-[500px]">
                    <MdFastfood className="text-xl  text-gray-700" />
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="Give me a title..."
                        className="w-full h-full text-lg bg-transparent font-medium text-textColor  outline-none border-none placeholder:text-gray-400 ml-5 "
                    ></input>
                </div>
                <div className="w-full mt-3 mb-2 ">
                    <select
                        className="outline-none text-base gap-4 text-gray-600 p-2 w-full cursor-pointer"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="other" selected className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map((item) => {
                                return (
                                    <option
                                        key={item.id}
                                        className="text-base border-0 outline-none capitalize bg-white text-headingColor  "
                                        value={item.urlParamName}
                                    >
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-grey-300 w-full h-25 md:h-420 cursor-pointer">
                    {isLoading ? (
                        <Loader radius={16} />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <>
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                            <p className="text-gray-500 hover:text-gray-700">
                                                Click here to upload
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="uploadimage"
                                            accept="image/*"
                                            onChange={uploadImage}
                                            className="w-0 h-0"
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="relative h-full ">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={imageAsset}
                                            alt="uploded "
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-3 r-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-100 transition-all ease-in-out "
                                            onClick={deleteImage}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
                        <MdFoodBank className="text-gray-700 text-2xl  " />
                        <input
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            type="text"
                            required
                            placeholder="Calories"
                            className="w-full h-full text-textColor text-lg font-semibold bg-transparent border-b-2 border-gray-600 outline-none border-none placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
                        <MdAttachMoney className="text-gray-700 text-2xl  " />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            required
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    saveDetails();
                                }
                            }}
                            placeholder="Price"
                            className="w-full h-full text-textColor text-lg font-semibold bg-transparent border-b-2 border-gray-600 outline-none border-none placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="flex items-center w-full ">
                    <button
                        type="button"
                        className="ml-0 md:mx-auto mt-6 w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold "
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;
