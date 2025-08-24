import type { Metadata } from 'next'
import SimpleUpload from './simple-upload'

export const metadata: Metadata = {
  title: 'Upload Files - DRISHTI Skill Development',
  description: 'Generic file upload portal for documents and media in the DRISHTI skill development ecosystem.',
}

export default function FilesUploadPage() {
  return <SimpleUpload />
}
