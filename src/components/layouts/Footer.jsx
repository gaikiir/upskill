import { List, ListItem, Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full">
      <div className=" w-full px-12 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <img
              src="images/logo.png"
              alt="logo"
              className="w-full max-w-xs object-cover"
            />
            <Typography className="text-gray-400 max-w-xs text-sm leading-relaxed">
              Building better products and experiences for teams of all sizes
              around the world.
            </Typography>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8">
            {LINKS.map(({ title, items }) => (
              <div key={title}>
                <Typography className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  {title}
                </Typography>
                <List className="p-0 min-w-0">
                  {items.map((link) => (
                    <ListItem
                      key={link}
                      className="text-gray-400 hover:text-white hover:bg-transparent p-0 py-1.5 text-sm font-normal transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography className="text-gray-500 text-sm">
            &copy; {CURRENT_YEAR} Your Company. All rights reserved.
          </Typography>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <Typography
                  key={item}
                  className="text-gray-500 hover:text-white text-sm cursor-pointer transition-colors duration-200"
                >
                  {item}
                </Typography>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:gaichris380@gmail.com"
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                  />
                </svg>
                gaichris380@gmail.com
              </a>

              <a
                href="tel:+254790817881"
                className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                +254 790 817 881
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
