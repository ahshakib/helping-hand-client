import React from "react";

function HeroSection() {
    return (
        <div className="flex items-center content-normal bg-hero-bg bg-center bg-no-repeat w-full h-[450px] bg-cover">
            <div className="w-full">
                <div className="">
                    <h1 className="text-white text-center text-6xl font-bold">Your Personal Assistant</h1>
                    <h2 className="text-white text-center text-2xl font-semibold">One stop solution for your services. Order any service anytime</h2>
                </div>

                <div className="my-5 w-full xl:w-1/3 lg:w-1/2 md:w-2/3 mx-auto">
                    <input type="search" className="rounded-md w-full p-3 focus:outline-none" placeholder="Find your services here e.g. AC, Car, Electrician..."/>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
