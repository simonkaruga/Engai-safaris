export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-100 pt-20 pb-16 px-4 md:px-6 border-b border-stone-100 animate-pulse">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <div className="h-3 bg-gray-200 rounded-full w-36 mb-5" />
          <div className="h-16 bg-gray-200 rounded-xl w-64 mb-4" />
          <div className="h-5 bg-gray-200 rounded-full w-full max-w-lg" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 animate-pulse">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 bg-gray-200 rounded-full w-20" />
          ))}
        </div>

        {/* Featured post skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden mb-12 shadow-sm">
          <div className="h-64 lg:h-80 bg-gray-200" />
          <div className="bg-gray-50 p-8 lg:p-10 space-y-4">
            <div className="h-3 bg-gray-200 rounded-full w-24" />
            <div className="h-8 bg-gray-200 rounded-xl w-4/5" />
            <div className="h-8 bg-gray-200 rounded-xl w-3/5" />
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-gray-200 rounded-full w-full" />
              <div className="h-4 bg-gray-200 rounded-full w-5/6" />
              <div className="h-4 bg-gray-200 rounded-full w-4/6" />
            </div>
          </div>
        </div>

        {/* Post grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded-lg w-full" />
                <div className="h-5 bg-gray-200 rounded-lg w-4/5" />
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
