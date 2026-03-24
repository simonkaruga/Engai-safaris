export default function SafariFeaturedCardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-2xl h-full min-h-[320px] animate-pulse relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-4 bg-gray-300 rounded-full w-1/4 mb-3" />
        <div className="h-7 bg-gray-300 rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-gray-300 rounded-full w-1/2 mb-4" />
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded-xl w-28" />
          <div className="h-8 bg-gray-300 rounded-lg w-24" />
        </div>
      </div>
    </div>
  )
}
