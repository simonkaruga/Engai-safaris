export default function SafariDetailLoading() {
  return (
    <>
      {/* Cinematic hero skeleton */}
      <section className="-mt-[100px] min-h-[75vh] bg-gray-800 animate-pulse flex items-end">
        <div className="relative w-full px-4 md:px-8 pb-12 max-w-7xl mx-auto">
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-white/20 rounded-full w-20" />
            <div className="h-6 bg-white/20 rounded-full w-16" />
            <div className="h-6 bg-white/20 rounded-full w-24" />
          </div>
          <div className="h-14 md:h-20 bg-white/20 rounded-xl w-3/4 mb-4" />
          <div className="h-6 bg-white/15 rounded-lg w-1/2 mb-6" />
          <div className="h-16 bg-white/10 rounded-2xl w-72" />
        </div>
      </section>

      {/* Body skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded-full w-20" />
              <div className="h-8 bg-gray-200 rounded-xl w-64" />
              <div className="h-4 bg-gray-100 rounded-full w-full" />
              <div className="h-4 bg-gray-100 rounded-full w-5/6" />
              <div className="h-4 bg-gray-100 rounded-full w-4/6" />
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded-full w-20" />
              <div className="h-8 bg-gray-200 rounded-xl w-56" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded-full w-24" />
              <div className="h-8 bg-gray-200 rounded-xl w-48" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="h-20 bg-gray-100 rounded-2xl" />
            <div className="h-48 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
            <div className="h-32 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </>
  );
}
