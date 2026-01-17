const stickyHeader = () => {
  const header = document.querySelector("header");
  const stickyHeader = header?.querySelector(".sticky-header");

  if (stickyHeader) {
    window.addEventListener("scroll", () => {
      const stickyHeaderHeight = stickyHeader.offsetHeight;
      const scrollCount = window.scrollY;

      // if (scrollCount - headerHeight < 0 && scrollCount - headerHeight > -5) {

      // }
      if (scrollCount < 500) {
        if (scrollCount > 400) {
          stickyHeader.setAttribute(
            "style",
            `position: fixed;top: -${stickyHeaderHeight}px;left:0;right:0;
          `
          );
          // stickyHeader.classList.remove("active");
        } else {
          stickyHeader.removeAttribute("style");
          // stickyHeader.classList.remove("active");
        }
      }
      if (scrollCount > 500) {
        stickyHeader.setAttribute(
          "style",
          " position: fixed;top: 0px; left:0;right:0;"
        );
        stickyHeader.classList.add("active");
      }
    });
  }
};
export default stickyHeader;
