import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { div, path } from "motion/react-client";
import amazonImage from "../assets/amazon.png";
import appleImage from "../assets/apple.png";
import asusImage from "../assets/asus.png";
import googleImage from "../assets/google.png";
import lenevoImage from "../assets/lenevo.png";
import microsoftImage from "../assets/microsoft.png";
import samsungImage from "../assets/samsung.png";
import arrowImage from "../assets/arrow.svg";
import heroImage from "../assets/hero.jpg";
import watchImage from "../assets/watch.png";
import lapImage from "../assets/lap.png";
import cartImage from "../assets/cart.svg";
import customerserviceImage from "../assets/customerservice.svg";
import hanbdImage from "../assets/hanbd.svg";
import cookedImage from "../assets/cooked.svg";

const Home = () => {
  const partners = [
    amazonImage,
    appleImage,
    asusImage,
    googleImage,
    lenevoImage,
    microsoftImage,
    samsungImage,
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
      imgUrl: cartImage,
    },
    {
      title: "Consultation Services",
      desc: " Providing expert advice on product selection based on customer needs and preferences.",
      imgUrl: customerserviceImage,
    },
    {
      title: "Technical Support",
      desc: "Offering assistance with product setup, troubleshooting, and maintenance.",
      imgUrl: hanbdImage,
    },
    {
      title: "Repair Services",
      desc: "Providing repair services for damaged devices, including screen replacements, battery changes, and software issues.",
      imgUrl: cookedImage,
    },
  ];
  return (
    <>
      <div className="mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          id="aboutus"
          className="bg-actions xl:mx-96 lg:mx-10 mx-8 p-12 rounded-2xl relative"
        >
          <div className="flex flex-col 2xl:flex-row items-center gap-12">
            <div className="text-primaryContent 2xl:w-1/2">
              <h1 className="text-5xl font-bold mb-6">
                Pick Something... <br />
                The Price 3lina
              </h1>
              <p className="text-xl font-semibold mb-8 opacity-90">
                Sel3a TIC provides its customers with everything they need to
                accomplish their daily tasks more efficiently, improve quality
                time with their loved ones, and spend less money.
              </p>
              <div className="hidden 2xl:block">
                <Link 
                  to={"/advertisments"}
                  className="inline-flex items-center px-8 py-4 bg-actionsHover rounded-xl hover:bg-opacity-90 transition-all duration-200 text-primaryContent font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Our Ads
                  <img
                    src={arrowImage}
                    alt=""
                    className="w-5 ml-3 fill-white"
                  />
                </Link>
              </div>
            </div>

            <div className="2xl:w-1/2 flex flex-col items-center">
              <img
                src={heroImage}
                className="rounded-xl shadow-lg w-full max-w-[600px] object-cover"
                alt="Hero"
              />
              <div className="block 2xl:hidden mt-8">
                <Link 
                  to={"/advertisments"}
                  className="inline-flex items-center px-8 py-4 bg-actionsHover rounded-xl hover:bg-opacity-90 transition-all duration-200 text-primaryContent font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Our Ads
                  <img
                    src={arrowImage}
                    alt=""
                    className="w-5 ml-3 fill-white"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute flex justify-around -z-40 blur-sm">
          <div className="blur-3xl right-0 absolute -z-50">
            <div className="absolute right-0 w-24 h-24 bg-primaryContent rounded-full blur-3xl -z-50"></div>
          </div>
          <div>
            <img src={watchImage} alt="" />
          </div>
          <div>
            <img src={lapImage} alt="" />
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
