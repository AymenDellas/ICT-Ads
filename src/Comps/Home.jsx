import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { div, path } from "motion/react-client";

const Home = () => {
  const partners = [
    "/src/assets/amazon.png",
    "/src/assets/apple.png",
    "/src/assets/asus.png",
    "/src/assets/google.png",
    "/src/assets/lenevo.png",
    "/src/assets/microsoft.png",
    "/src/assets/samsung.png",
  ];
  const categories = [
    {
      name: "Smartphones and Mobile Devices",
      path: "/Smartphones-and-Mobile-Devices",
    },
    {
      name: "Tablets and E-Readers",
      path: "/Tablets-and-E-Readers",
    },
    {
      name: "Laptops and Ultrabooks",
      path: "/Laptops-and-Ultrabooks",
    },
    {
      name: "Wearable Technology",
      path: "/Wearable-Technology",
    },
    {
      name: "Communication Devices",
      path: "/Communication-Devices",
    },
    {
      name: "Wireless Earbuds and Audio",
      path: "/Wireless-Earbuds-and-Audio",
    },
    {
      name: "Smart Home and IoT Devices",
      path: "/Smart-Home-and-IoT-Devices",
    },
    {
      name: "Networking Equipment",
      path: "/Networking-Equipment",
    },
    {
      name: "Professional Audio-Visual Equipment",
      path: "/Professional-Audio-Visual-Equipment",
    },
    {
      name: "Emerging Technology Devices",
      path: "/Emerging-Technology-Devices",
    },
  ];
  const services = [
    {
      title: "Product Sales",
      desc: "Selling a range of TIC products such as smartphones, tablets, laptops, smartwatches, and accessories.",
      imgUrl: "/src/assets/cart.svg",
    },
    {
      title: "Consultation Services",
      desc: " Providing expert advice on product selection based on customer needs and preferences.",
      imgUrl: "/src/assets/customerservice.svg",
    },
    {
      title: "Technical Support",
      desc: "Offering assistance with product setup, troubleshooting, and maintenance.",
      imgUrl: "/src/assets/hanbd.svg",
    },
    {
      title: "Repair Services",
      desc: "Providing repair services for damaged devices, including screen replacements, battery changes, and software issues.",
      imgUrl: "/src/assets/cooked.svg",
    },
  ];
  return (
    <>
      <div className=" mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          id="aboutus"
          className="bg-actions xl:mx-96 lg:mx-10 mx-8 flex flex-col justify-between   2xl:flex-row p-8 rounded-lg relative"
        >
          <div className=" text-primaryContent mb-8">
            <p className="text-5xl font-bold mb-8">
              Pick Something... <br />
              The Price 3lina
            </p>
            <p className="ml-4 font-semibold text-xl">
              Sel3a TIC provides its customers with everything they need to
              accomplish their daily tasks more efficiently, improve quality
              time with their loved ones, and spend less money.
            </p>
            <div className="bottom-0 left-0 mb-8 ml-10 rounded-lg bg-actionsHover py-2 px-4 cursor-pointer hover:bg-[#475a41] transition-all font-semibold absolute ">
              <div className="flex">
                <Link to={"/advertisments"}>Our Ads</Link>
                <img
                  src="/src/assets/arrow.svg"
                  alt=""
                  className="w-4 ml-2 fill-white"
                />
              </div>
            </div>
          </div>
          <div className="">
            <img
              src="/src/assets/hero.jpg"
              alt=""
              className="rounded-lg w-[600px] 2xl:w-fit"
            />
          </div>
        </motion.div>
        <div className="absolute flex justify-around -z-40 blur-sm">
          <div className="blur-3xl right-0 absolute -z-50">
            <div className="absolute right-0 w-24 h-24 bg-primaryContent rounded-full blur-3xl -z-50"></div>
          </div>
          <div>
            <img src="/src/assets/watch.png" className="" />
          </div>
          <div>
            <img src="/src/assets/lap.png" className="" />
          </div>
        </div>

        <div className="blur-3xl -z-50">
          <div className="absolute left-0 w-36 h-36 bg-primaryContent rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="xl:mx-96 "
          id="services"
        >
          <h1 className="text-primaryContent text-3xl font-bold text-center my-8  underline  ">
            Services
          </h1>
          <div>
            <div className="text-primaryContent ">
              {services.map((service) => {
                return (
                  <div className="flex items-center bg-actions m-4 rounded-lg px-4">
                    <div className="">
                      <img src={service.imgUrl} className="w-12 fill-white" />
                    </div>
                    <div className="m-8">
                      <h1 className="font-bold text-2xl mb-4">
                        {service.title}
                      </h1>
                      <p className="font-semibold">{service.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="xl:mx-96"
          id="partners"
        >
          <h1 className="text-primaryContent text-3xl font-bold text-center my-8  underline  ">
            Our Partners
          </h1>
          <div className="grid grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => {
              return (
                <div className="flex items-center justify-around w-fit mx-auto bg-actions hover:bg-actionsHover shadow-xl transition-all m-8 p-8 rounded-xl">
                  <img src={partner} alt="" className="2xl:w-48 w-24" />;
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
