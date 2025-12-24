import { Skeleton } from '@/components/ui/skeleton';

export function TokenSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Skeleton className="h-10 w-10 rounded-full shimmer" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24 shimmer" />
        <Skeleton className="h-3 w-16 shimmer" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 shimmer" />
        <Skeleton className="h-3 w-16 shimmer" />
      </div>
      <Skeleton className="h-4 w-16 shimmer" />
      <Skeleton className="h-4 w-20 shimmer" />
      <Skeleton className="h-4 w-24 shimmer" />
      <Skeleton className="h-4 w-16 shimmer" />
      <Skeleton className="h-4 w-16 shimmer" />
    </div>
  );
}

export function TokenTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      {Array.from({ length: rows }).map((_, i) => (
        <TokenSkeleton key={i} />
      ))}
    </div>
  );
}