import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FilesUploadPage() {
  const uploadQueue = [
    { id: 1, name: "registration_certificate.pdf", size: "2.4 MB", status: "Completed", progress: 100 },
    { id: 2, name: "financial_statements.xlsx", size: "1.8 MB", status: "Uploading", progress: 65 },
    { id: 3, name: "kyc_documents.zip", size: "5.2 MB", status: "Failed", progress: 0 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Upload Files</h1>
          <p className="text-slate-600">Generic file upload portal for documents and media</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>Drag and drop files or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Drop files here</h3>
              <p className="text-slate-600 mb-4">or click to browse from your computer</p>
              <Button>
                <File className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
              <p className="text-xs text-slate-500 mt-4">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Queue</CardTitle>
            <CardDescription>Track your file upload progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadQueue.map((file) => (
                <div key={file.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-slate-500" />
                      <span className="font-medium text-slate-900 truncate">{file.name}</span>
                    </div>
                    <Badge
                      variant={
                        file.status === "Completed"
                          ? "default"
                          : file.status === "Uploading"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {file.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {file.status === "Uploading" && <Clock className="h-3 w-3 mr-1" />}
                      {file.status === "Failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {file.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{file.size}</span>
                    <span>{file.progress}%</span>
                  </div>
                  {file.status === "Uploading" && (
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
