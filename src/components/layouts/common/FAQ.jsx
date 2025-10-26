import { useState } from "react";

export default function FAQ({ faqs = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded">
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span>{open === i ? "-" : "+"}</span>
              </button>
              {open === i && <div className="p-4 border-t">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
