/**
 * Skeleton loader for GitHub Contribution Timeline
 * Displays a pulsing placeholder while data is loading
 */

export function GitHubTimelineSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 h-6 w-48 rounded bg-gray-200 animate-pulse" />
      
      <div className="overflow-hidden">
        <div className="flex gap-1">
          {/* Create 52 weeks of skeleton squares */}
          {Array.from({ length: 52 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {/* 7 days per week */}
              {Array.from({ length: 7 }).map((_, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className="h-3 w-3 rounded-sm bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="mt-6 flex gap-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="h-6 w-16 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
