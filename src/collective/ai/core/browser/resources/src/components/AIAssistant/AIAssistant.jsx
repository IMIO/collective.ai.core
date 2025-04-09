import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useDragControls} from "framer-motion";
import Tabs from "./Tabs";
import DragHandle from "../handle.svg?react";
import AiLogo from "../ai.svg?react";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    const dragControls = useDragControls();
    const constraintsRef = useRef(null);
    const containerVariants = {
        closed: {
            width: 500,
            height: 800,
            scale: 0,
            opacity: 0
        },
        open: {
            width: 500,
            height: 800,
            borderRadius: "0.5rem",
            scale: 1,
            opacity: 1
        },
        hover: {
            // You could also add a subtle effect on the parent if you like
        }
    };
    const buttonVariants = {
        closed: {
            y: 20,
            opacity: 0
        },
        open: {
            y: 20,
            opacity: 0
        },
        hover: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.2}
        }
    };

    // Set hasMounted to true after the first render
    useEffect(() => {
        setHasMounted(true);
    }, []);


    return (
        <>
            {/* AnimatePresence JUST for the button (fab) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="fab"
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 right-4 bg-gray-900 shadow-lg flex justify-center items-center"
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: "25%",
                        }}
                        // Only apply the initial animation if we have already mounted
                        initial={hasMounted ? {scale: 0, opacity: 0} : false}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0, opacity: 0}}
                        transition={{duration: 0.15}}
                    >
                        <AiLogo className="w-12 h-12 fill-white text-white"></AiLogo>
                    </motion.button>
                )}
            </AnimatePresence>
            <div
                // This can be any HTML element, not necessarily `motion.div`
                ref={constraintsRef}
                style={{
                    // backgroundColor: 'rgba(0,0,0,0.1)',
                    position: 'fixed',
                    width: "calc(100vw - 20px)",  // your custom width
                    right: "10px",
                    bottom: "10px",
                    height: "calc(100vh - 100px)",  // your custom height
                    pointerEvents: 'none',
                    zIndex: 100
                }}
            >

                {/* The draggable container - ALWAYS MOUNTED */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragControls={dragControls}
                    dragListener={false}
                    dragTransition={{
                        power: 0.2,
                        timeConstant: 150,
                        bounceStiffness: 50,
                        bounceDamping: 10
                    }}
                    // Variants to open/close the container
                    variants={containerVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    // On hover, go to the "hover" variant
                    whileHover="hover"
                    transition={{duration: 0.15}}
                    style={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        borderRadius: "50%",
                        pointerEvents: isOpen ? "auto" : "none",
                        zIndex: 999999999999999,
                        backgroundColor: "white",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                    }}
                    className={"relative border border-gray-700"}
                >
                    <motion.div
                        className={"w-full h-8 absolute rounded-t-md -top-[33px] flex justify-center items-center -z-10"}
                        variants={buttonVariants} transition={{duration: 0.15}}>
                        <div
                            className={"w-12 h-8  rounded-t-md handle bg-gray-50 border border-gray-300 w-24 flex justify-center items-center cursor-grab"}
                            onPointerDown={(e) => dragControls.start(e)}>
                            <DragHandle className={"fill-gray-800 w-4"}></DragHandle>
                        </div>
                    </motion.div>

                    <motion.div
                        className={"w-1/4 h-8 absolute right-0 -top-[33px] flex justify-end items-center px-4 -z-10"}
                        variants={buttonVariants} transition={{duration: 0.15}}>
                        <div className={"w-12 h-8  rounded-t-md bg-red-600 flex justify-center items-center"}>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-50 hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>


                    {/* HEADER / CLOSE BUTTON */}
                    <div
                        className="flex justify-center items-center px-4 py-2 rounded-t-[5px] bg-gray-600 relative left-0"
                    >
                        <h2 className="font-semibold text-gray-100">iA.+K</h2>
                    </div>
                    <Tabs/>
                </motion.div>
            </div>
        </>
    );
}

export default AIAssistant;
