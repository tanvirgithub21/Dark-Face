
export default function UploadStatus({ loading, error, id }) {

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
            <p className="text-blue-500 font-medium">Loading...</p>
          </div>
        ) : error && id ? (
          <p className="text-red-500 font-medium">Upload Unsuccessful 😞</p>
        ) : (
          <p className="text-green-500 font-medium">Upload Successful 🎉</p>
        )}
      </div>
    </div>
  );
}
