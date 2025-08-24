import type { Metadata } from 'next'
import PlacementsClient from './placements-client'

export const metadata: Metadata = {
  title: 'Placements - DRISHTI Skill Development',
  description: 'Manage and track student placements, job opportunities, and employment statistics in the DRISHTI skill development ecosystem.',
}

export default function PlacementsPage() {
  return <PlacementsClient />
}