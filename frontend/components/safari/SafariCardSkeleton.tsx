export default function SafariCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded-full w-full mb-1" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3 mb-4" />
        <div className="flex justify-between items-end pt-3 border-t border-gray-100">
          <div>
            <div className="h-2 bg-gray-100 rounded-full w-16 mb-1.5" />
            <div className="h-5 bg-gray-200 rounded-full w-24" />
          </div>
          <div className="h-3 bg-gray-100 rounded-full w-12" />
        </div>
      </div>
    </div>
  )
}
