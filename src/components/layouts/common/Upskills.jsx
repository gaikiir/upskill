const ImageCheckbox = ({ title, image, description }) => {
  return (
    <div className="flex flex-row items-start  text-left  gap-3">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-5 h-5 object-contain flex-shrink-0 mt-0.5"
        />
      )}
      <div className="flex-1">
        {title && (
          <p className="text-sm font-medium  text-gray-800 leading-tight ">
            {title}
          </p>
        )}
        {description && (
          <p className="text-sm  text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default function UpSkillCompo() {
  // Sample data for checkboxes - update titles as needed
  const checkboxItems = [
    {
      title: "Relevant Skill Set",
      image: "images/checked.png",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    },
    {
      title: "Growth MindSet.",
      image: "images/checked.png",
      description:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      title: "1-on-1 Monitoring",
      image: "images/checked.png",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    },
    {
      title: "Hiring Partiners",
      image: "images/checked.png",
      description:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
  ];

  // Placeholder for right-side image - replace with your actual image path
  const rightImage = "images/studies.png"; // Update this path

  return (
    <section className="py-10 bg-gray-50 mt-4">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Heading + Two-Column Checkboxes */}
          <article className="space-y-6">
            <h4 className="text-left font-bold text-2xl md:text-3xl text-blue-gray-800 leading-tight">
              The Advantages of the
              <br />
              <span className="text-blue-600">Upskill Program.</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checkboxItems.map((item, index) => (
                <ImageCheckbox
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </article>

          {/* Right Column: Main Image */}
          <figure className="w-full h-64 md:h-80 lg:h-auto relative">
            <img
              src={rightImage}
              alt="Upskill Program Illustration"
              className="w-full h-full object-cover rounded-lg shadow-none"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
