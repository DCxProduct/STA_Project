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
        <div className="container-fluid py-1 lg:py-5 bg bg-default menu-header">
          {loading ? (
            <div className="md:container-default hidden md:block">
              {/* <ul className="nav-list flex justify-between items-center">
                <li className={`nav-item group `}>
                  <span className="gap-3 cursor-pointer flex items-center bg-lightGrey9 w-2 h-2"></span>
                </li>
              </ul> */}
              <nav className="bg-default p-2">
                <div className="flex justify-center space-x-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <li
                      key={i}
                      className="nav-item lg:text-size-17 animate-pulse list-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-24 bg-gray-300 rounded" />
                        <div className="h-4 w-4 bg-gray-300 rounded-lg" />
                      </div>
                    </li>
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
