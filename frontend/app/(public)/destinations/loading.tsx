export default function DestinationsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 border-b border-stone-100 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 bg-gray-200 rounded-full w-28 mb-4" />
          <div className="h-14 bg-gray-200 rounded-xl w-80 mb-4" />
          <div className="h-5 bg-gray-200 rounded-full w-96" />
        </div>
      </section>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-gray-200 h-72">
              <div className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
