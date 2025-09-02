function UploadFile({ onUpload }) {
  return (
    <div className="flex flex-col">
      <input
        type="file"
        className="mb-2"
        onChange={(e) => onUpload(e.target.files[0])}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Upload
      </button>
    </div>
  );
}

export default UploadFile;
