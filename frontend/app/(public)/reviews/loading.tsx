export default function ReviewsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 border-b border-stone-100 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 bg-gray-200 rounded-full w-28 mb-4" />
          <div className="h-14 bg-gray-200 rounded-xl w-72 mb-4" />
          <div className="h-5 bg-gray-200 rounded-full w-80" />
          {/* Rating summary skeleton */}
          <div className="flex gap-6 mt-8">
            <div className="h-16 bg-gray-200 rounded-2xl w-40" />
            <div className="h-16 bg-gray-200 rounded-2xl w-40" />
            <div className="h-16 bg-gray-200 rounded-2xl w-40" />
          </div>
        </div>
      </section>

      {/* Reviews grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              {/* Stars */}
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-3.5 h-3.5 bg-gray-200 rounded-sm" />
                  ))}
                </div>
                <div className="w-7 h-7 bg-gray-100 rounded" />
              </div>
              {/* Title */}
              <div className="h-4 bg-gray-200 rounded-full w-4/5" />
              {/* Body */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-5/6" />
                <div className="h-3 bg-gray-100 rounded-full w-4/6" />
                <div className="h-3 bg-gray-100 rounded-full w-3/6" />
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded-full w-28" />
                  <div className="h-2.5 bg-gray-100 rounded-full w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
