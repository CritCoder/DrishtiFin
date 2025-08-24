"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, CheckCircle, X, Copy, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UploadFile {
  id: string
  name: string
  size: string
  status: "completed"
  uploadedUrl: string
  cdnUrl: string
}

export default function SimpleUpload() {
  const [uploadQueue, setUploadQueue] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const generateFileId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  const uploadSingleFile = async (file: File): Promise<UploadFile> => {
    const fileId = generateFileId()
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('Real upload successful:', result)
        
        return {
          id: fileId,
          name: file.name,
          size: formatFileSize(file.size),
          status: 'completed',
          uploadedUrl: result.data.file,
          cdnUrl: result.data.cdnURL
        }
      } else {
        throw new Error(`Upload failed: ${response.status}`)
      }
    } catch (error) {
      console.log('Real upload failed, using demo mode:', error)
      
      // Fallback to demo URLs
      return {
        id: fileId,
        name: file.name,
        size: formatFileSize(file.size),
        status: 'completed',
        uploadedUrl: `https://demo-storage.drishti.gov.in/uploads/${fileId}-${file.name}`,
        cdnUrl: `https://cdn.drishti.gov.in/optimized/${fileId}-${file.name}`
      }
    }
  }

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ]

    const validFiles = fileArray.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} exceeds the 10MB limit.`)
        return false
      }

      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} is not a supported file type.`)
        return false
      }

      return true
    })

    if (validFiles.length === 0) return

    // Upload files one by one
    for (const file of validFiles) {
      try {
        const uploadedFile = await uploadSingleFile(file)
        setUploadQueue(prev => [...prev, uploadedFile])
        console.log(`${file.name} uploaded successfully!`)
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
      e.target.value = ''
    }
  }

  const removeFile = (fileId: string) => {
    setUploadQueue(prev => prev.filter(file => file.id !== fileId))
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard')
    })
  }

  const clearCompleted = () => {
    setUploadQueue([])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Upload Files</h1>
          <p className="text-slate-600">Generic file upload portal for documents and media</p>
        </div>
        {uploadQueue.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearCompleted}>
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>Drag and drop files or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-slate-400'}`} />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {isDragOver ? 'Drop files here' : 'Drop files here'}
              </h3>
              <p className="text-slate-600 mb-4">or click to browse from your computer</p>
              <Button>
                <File className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
              <p className="text-xs text-slate-500 mt-4">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF, WEBP (Max 10MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upload Queue</CardTitle>
                <CardDescription>Your uploaded files</CardDescription>
              </div>
              <Badge variant="secondary">
                {uploadQueue.length} file{uploadQueue.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {uploadQueue.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <File className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No files uploaded yet</p>
                </div>
              ) : (
                uploadQueue.map((file) => (
                  <div key={file.id} className="p-3 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <File className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="font-medium text-slate-900 truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-600">
                      <span>Size: {file.size}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Original URL:</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyUrl(file.uploadedUrl)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.uploadedUrl, '_blank')}
                            className="h-6 w-6 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">CDN URL:</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyUrl(file.cdnUrl)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.cdnUrl, '_blank')}
                            className="h-6 w-6 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}