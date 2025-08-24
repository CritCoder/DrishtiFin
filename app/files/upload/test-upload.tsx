"use client"

export default function TestUpload() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File Upload Test</h1>
      <p>If you can see this, the basic React component is working.</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  )
}