import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setIsOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NavbarItems = (
    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 list-none p-0 m-0">
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/menu" className="flex items-center">
          Menu
        </Link>
      </Typography>
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/about" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/reservations" className="flex items-center">
          Reservations
        </Link>
      </Typography>
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/gallery" className="flex items-center">
          Gallery
        </Link>
      </Typography>
      <Typography
        className="font-normal p-1"
        as="li"
        variant="small"
        color="blue-gray"
      >
        <Link to="/contact" className="flex items-center">
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
        <Navbar className="fixed top-0 left-0 z-50 max-h max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              <img
                src="images/urban-utopia-logo.png"
                alt="logo"
                className="w-12 object-cover bg-black rounded-full "
              />
            </Typography>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{NavbarItems}</div>
              <div className="flex items-center gap-x-1">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign In</span>
                </Button>

                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Order Online</span>
                </Button>
              </div>

              <IconButton
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                variant="text"
                ripple={false}
                onClick={() => setIsOpen((open) => !open)}
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={isOpen}>
            {NavbarItems}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm">
                <span>Sign In</span>
              </Button>
              <Button fullWidth variant="gradient" size="sm">
                <span>Order Online</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}
