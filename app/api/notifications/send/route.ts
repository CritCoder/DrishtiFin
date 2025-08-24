import { NextRequest, NextResponse } from 'next/server';
import { notificationService, NotificationType } from '@/lib/notification-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, recipient, data } = body;

    // Validate required fields
    if (!type || !recipient || !recipient.email) {
      return NextResponse.json(
        { error: 'Missing required fields: type, recipient.email' },
        { status: 400 }
      );
    }

    // Validate notification type
    if (!Object.values(NotificationType).includes(type)) {
      return NextResponse.json(
        { error: 'Invalid notification type' },
        { status: 400 }
      );
    }

    // Send notification
    const success = await notificationService.sendNotification(type, recipient, data || {});

    if (success) {
      return NextResponse.json({ success: true, message: 'Notification sent successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Notification API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to list available notification types
export async function GET() {
  return NextResponse.json({
    types: Object.values(NotificationType),
    templates: [
      { type: 'welcome', description: 'Welcome email for new users' },
      { type: 'accountApproved', description: 'Account approval confirmation' },
      { type: 'passwordReset', description: 'Password reset link' },
      { type: 'batchCreated', description: 'New training batch created' },
      { type: 'paymentProcessed', description: 'Payment milestone completed' },
      { type: 'placementVerified', description: 'Placement verification success' },
      { type: 'documentExpiry', description: 'Document expiration alert' },
      { type: 'approvalPending', description: 'New approval request' }
    ]
  });
}