const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="animate-pulse">
        <div className="bg-gray-300 rounded-lg h-48 w-full mb-4" />
        <div className="space-y-3">
          <div className="bg-gray-300 rounded h-4 w-3/4" />
          <div className="bg-gray-300 rounded h-4 w-1/2" />
          <div className="bg-gray-300 rounded h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;