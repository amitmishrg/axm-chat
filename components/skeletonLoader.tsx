export const SkeletonLoader = ({
  message,
  type = 'text',
}: {
  message: string;
  type?: 'chart' | 'text';
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      {type === 'chart' ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="flex space-x-4">
            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      )}
    </div>
  );
};
