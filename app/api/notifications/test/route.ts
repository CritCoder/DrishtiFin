import { NextRequest, NextResponse } from 'next/server';
import { notificationService, NotificationType } from '@/lib/notification-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email = 'test@example.com' } = body;

    if (!type || !Object.values(NotificationType).includes(type)) {
      return NextResponse.json(
        { error: 'Invalid notification type' },
        { status: 400 }
      );
    }

    // Test data for different notification types
    const testRecipient = {
      userId: 'test-123',
      email,
      name: 'John Doe',
      role: 'training_partner'
    };

    let success = false;

    switch (type) {
      case NotificationType.WELCOME:
        success = await notificationService.sendWelcomeEmail(testRecipient);
        break;

      case NotificationType.ACCOUNT_APPROVED:
        success = await notificationService.sendAccountApprovalEmail(testRecipient);
        break;

      case NotificationType.PASSWORD_RESET:
        success = await notificationService.sendPasswordResetEmail(
          testRecipient,
          'https://drishti-fin.vercel.app/reset-password?token=test123'
        );
        break;

      case NotificationType.BATCH_CREATED:
        success = await notificationService.sendBatchCreatedNotification(testRecipient, {
          batchId: 'BATCH-2024-001',
          batchName: 'Web Development Bootcamp',
          courseName: 'Full Stack Web Development',
          startDate: '15th March 2024',
          duration: '3 months',
          capacity: '30'
        });
        break;

      case NotificationType.PAYMENT_PROCESSED:
        success = await notificationService.sendPaymentProcessedNotification(testRecipient, {
          amount: '50,000',
          milestone: 'Batch Completion',
          batchName: 'Web Development Bootcamp',
          transactionId: 'TXN-2024-001'
        });
        break;

      case NotificationType.PLACEMENT_VERIFIED:
        success = await notificationService.sendPlacementVerifiedNotification(testRecipient, {
          studentName: 'Rahul Kumar',
          companyName: 'TechCorp India',
          position: 'Junior Developer',
          salary: '4,80,000',
          placementId: 'PLC-2024-001'
        });
        break;

      case NotificationType.DOCUMENT_EXPIRY:
        success = await notificationService.sendDocumentExpiryAlert(testRecipient, {
          documentName: 'Training Partner License',
          documentType: 'Certification',
          expiryDate: '30th April 2024',
          daysRemaining: '15'
        });
        break;

      case NotificationType.APPROVAL_PENDING:
        success = await notificationService.sendApprovalPendingNotification(testRecipient, {
          requestType: 'New Training Partner Registration',
          submittedBy: 'TechSkills Training Institute',
          priority: 'High',
          referenceId: 'APP-2024-001'
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Notification type not implemented in test' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success,
      message: success ? 'Test email sent successfully' : 'Failed to send test email',
      type,
      recipient: email
    });

  } catch (error) {
    console.error('Test notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Notification Test Endpoint',
    usage: 'POST with { "type": "welcome", "email": "test@example.com" }',
    availableTypes: Object.values(NotificationType)
  });
}