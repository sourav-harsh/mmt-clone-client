export default function TrainSearchForm() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <div className="grid gap-3 md:grid-cols-4">
        <Field label="From" defaultValue="New Delhi (NDLS)" />
        <Field label="To" defaultValue="Mumbai Central (BCT)" />
        <Field label="Travel Date" type="date" defaultValue={today} />
        <Field label="Class" defaultValue="All Classes" />
      </div>
      <div className="text-center mt-5">
        <button className="bg-mmtOrange hover:bg-orange-600 text-white font-bold px-12 py-3 rounded-full shadow">
          SEARCH TRAINS
        </button>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block border border-gray-200 rounded-md p-3 hover:border-mmtBlue transition">
      <span className="text-xs text-gray-500 font-semibold">{label}</span>
      <input {...rest} className="w-full outline-none mt-1 text-sm font-medium text-mmtDark bg-transparent" />
    </label>
  );
}
