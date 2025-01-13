function Error({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default Error; 