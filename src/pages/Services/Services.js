import React from "react";
import Navbar from "../../components/Navbar";
import ServiceCard from "../../components/Services/ServiceCard";
import useAuth from "../../hooks/useAuth";

function Service() {
  const { services, categories } = useAuth()

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-2">
        <h1 className="text-3xl font-bold mt-8">All Services</h1>
        {categories.map((category) => (
          <div key={category._id} className="my-20">
            <div className="w-full">
              <h2 className="my-5 text-2xl font-semibold">{category.name}</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {services
                  .filter((service) => service.category === category.name)
                  .map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
