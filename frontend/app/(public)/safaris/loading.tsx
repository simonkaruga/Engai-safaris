export default function SafarisLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gray-950 pt-20 pb-16 px-4 md:px-6 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 bg-white/10 rounded-full w-24 mb-5" />
          <div className="h-12 bg-white/10 rounded-xl w-72 mb-4" />
          <div className="h-5 bg-white/10 rounded-full w-96 mb-8" />
          {/* Category tabs skeleton */}
          <div className="flex gap-3 flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-white/10 rounded-xl w-28" />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl min-h-[380px] animate-pulse relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <div className="h-3 bg-gray-300 rounded-full w-1/4" />
                <div className="h-6 bg-gray-300 rounded-lg w-3/4" />
                <div className="h-3 bg-gray-300 rounded-full w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-9 bg-gray-300 rounded-xl w-28" />
                  <div className="h-9 bg-gray-300 rounded-lg w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
