import NavItems from "./NavItems";
const Navbar = ({ localActive, data, footer }) => {
  return (
    <nav>
      <div className="relative">
        <div className="mx-auto container xl:text-size-17 lg:text-size-13 ">
          <NavItems
            navItems={data ?? []}
            locale={localActive}
            footer={footer}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
