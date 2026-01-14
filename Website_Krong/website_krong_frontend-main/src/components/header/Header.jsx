"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import stickyHeader from "@/libs/stickyHeader";
import MobileMenu from "./MobileMenu";
import { useLocale } from "next-intl";
import axios from "axios";
import Aos from "aos";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const Header = () => {
  const localActive = useLocale();
  const [data, setData] = useState(null);
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    stickyHeader();
    // smoothScroll();
    // AOS Scroll Animation
    Aos.init({
      offset: 1,
      duration: 1000,
      once: true,
      easing: "ease",
    });
  }, []);

  useEffect(() => {
    async function fetchHeader() {
      try {
        const response = await axios.get(`${API_URL}/home/${localActive}`, {
          headers: {
            Authorization: API_KEY,
          },
        });
        const { header_menu } = response.data;
        const { footer_menu } = response.data;
        setData(header_menu.links);
        setFooter(footer_menu[1]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching header:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHeader();
  }, [localActive]);
  return (
    <header>
      {/* header top */}
      {/* <NavbarTop /> */}
      {/* navbar */}

      <div className=" transition-all duration-500 sticky-header z-50 ">
        <div className="container-fluid lg:py-3 bg bg-default text-white">
          {loading ? (
            <div className="md:container-default hidden md:block">
              {/* <ul className="nav-list flex justify-between items-center">
                <li className={`nav-item group `}>
                  <span className="gap-3 cursor-pointer flex items-center bg-lightGrey9 w-2 h-2"></span>
                </li>
              </ul> */}
              <nav className="bg-default p-2">
                <div className="flex justify-center space-x-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-24 rounded-md bg-gray-400 opacity-50 animate-pulse"
                    ></div>
                  ))}
                </div>
              </nav>
            </div>
          ) : (
            <Navbar localActive={localActive} data={data} footer={footer} />
          )}
          {loading ? <span></span> : <MobileMenu links={data} />}
        </div>
      </div>

      {/* mobile menu */}
      {/* <MobileMenu /> */}
    </header>
  );
};

export default Header;
