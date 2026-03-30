export default function GuidesLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 border-b border-stone-100 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 bg-gray-200 rounded-full w-24 mb-4" />
          <div className="h-14 bg-gray-200 rounded-xl w-72 mb-4" />
          <div className="h-5 bg-gray-200 rounded-full w-96" />
        </div>
      </section>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-64 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                <div className="flex gap-2 pt-1">
                  <div className="h-6 bg-gray-100 rounded-full w-16" />
                  <div className="h-6 bg-gray-100 rounded-full w-20" />
                  <div className="h-6 bg-gray-100 rounded-full w-14" />
                </div>
                <div className="h-10 bg-gray-100 rounded-xl w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
