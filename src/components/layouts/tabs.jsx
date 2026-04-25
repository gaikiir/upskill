import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
const data = [
  {
    id: 1,
    label: "Mission",
    value: "mission",
    icon: "🎯",
    desc: `To provide exceptional dining experiences by serving delicious, high-quality meals prepared with fresh, locally-sourced ingredients. We believe great food nourishes both body and spirit, creating moments of joy around every table.`,
    bg: "linear-gradient(to right, rgb(249, 115, 22), rgb(234, 88, 12))",
  },
  {
    id: 2,
    label: "Vision",
    value: "vision",
    icon: "☕",
    desc: `To become the most trusted and beloved restaurant in the community, known for culinary excellence, sustainable practices, and exceptional hospitality that makes every guest feel valued.`,
    bg: "linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74))",
  },
];

export default function TabsDefault() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="text-center mb-12">
      <Typography variant="h3" className="font-bold text-gray-700 mb-6">
        Our Purpose
      </Typography>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsHeader>
          {data.map((item) => (
            <Tab
              key={item.id}
              value={item.value}
              className={
                activeTab === item.value
                  ? "!text-orange-500 !font-bold"
                  : "!text-green-700"
              }
            >
              {item.label}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody>
          {data.map((item) => (
            <TabPanel key={item.id} value={item.value}>
              <div
                style={{ background: item.bg }}
                className="flex gap-6 items-start leading-relaxed animate-fade-in rounded-2xl bg-gradient-to-r p-10 text-white shadow-xl"
              >
                <span className="text-5xl flex-shrink-0">{item.icon}</span>
                <p className="opacity-95">{item.desc}</p>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
/*


 <section>
          <div className="text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-700 mb-6">
              Our Purpose
            </Typography>
            <div className="flex gap-4 justify-center">
              {["Mission", "Vision"].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div
            className="animate-fade-in rounded-2xl bg-gradient-to-r p-10 text-white shadow-xl"
            style={{
              backgroundImage:
                activeTab === 0
                  ? "linear-gradient(to right, rgb(249, 115, 22), rgb(234, 88, 12))"
                  : "linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74))",
            }}
          >
            <div className="flex gap-6 items-start">
              <span className="text-5xl flex-shrink-0">
                {activeTab === 0 ? "🎯" : "☕"}
              </span>
              <div>
                <Typography variant="h5" className="mb-3 font-bold">
                  {activeTab === 0 ? "Our Mission" : "Our Vision"}
                </Typography>
                <Typography className="leading-relaxed opacity-95 font-bold">
                  {activeTab === 0
                    ? "To provide exceptional dining experiences by serving delicious, high-quality meals prepared with fresh, locally-sourced ingredients. We believe great food nourishes both body and spirit, creating moments of joy around every table."
                    : "To become the most trusted and beloved restaurant in the community, known for culinary excellence, sustainable practices, and exceptional hospitality that makes every guest feel valued."}
                </Typography>
              </div>
            </div>
          </div>
        </section>

*/
