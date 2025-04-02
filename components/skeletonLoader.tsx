export const SkeletonLoader = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-pulse w-6 h-6 bg-gray-300 rounded-full"></div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
