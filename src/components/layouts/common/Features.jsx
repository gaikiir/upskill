export default function Features({ items = [] }) {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-sm mb-3">
                {it.icon}
              </div>
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="text-xs text-gray-500">{it.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
