import { createEmailService, emailTemplates } from './email-service';

interface NotificationData {
  userId: string;
  email: string;
  name: string;
  role: string;
  [key: string]: any;
}

export enum NotificationType {
  // Authentication
  WELCOME = 'welcome',
  ACCOUNT_APPROVED = 'accountApproved',
  PASSWORD_RESET = 'passwordReset',
  
  // Training Partner
  BATCH_CREATED = 'batchCreated',
  PAYMENT_PROCESSED = 'paymentProcessed',
  DOCUMENT_EXPIRY = 'documentExpiry',
  
  // Placement
  PLACEMENT_VERIFIED = 'placementVerified',
  
  // System
  APPROVAL_PENDING = 'approvalPending'
}

class NotificationService {
  private emailService = createEmailService();
  
  async sendNotification(
    type: NotificationType,
    recipient: NotificationData,
    data: Record<string, string>
  ): Promise<boolean> {
    try {
      const template = emailTemplates[type];
      if (!template) {
        throw new Error(`Unknown notification type: ${type}`);
      }

      // Common variables available to all templates
      const variables = {
        userName: recipient.name,
        userEmail: recipient.email,
        userRole: this.getRoleDisplayName(recipient.role),
        currentDate: new Date().toLocaleDateString('en-IN'),
        supportEmail: 'support@drishti.gov.in',
        loginUrl: 'https://drishti-fin.vercel.app/login',
        dashboardUrl: 'https://drishti-fin.vercel.app/',
        ...data
      };

      return await this.emailService.sendEmail(recipient.email, template, variables);
    } catch (error) {
      console.error(`Failed to send ${type} notification:`, error);
      return false;
    }
  }

  private getRoleDisplayName(role: string): string {
    const roleNames: Record<string, string> = {
      'osda_admin': 'OSDA Administrator',
      'super_admin': 'Super Administrator',
      'department_user': 'Department User',
      'training_partner': 'Training Partner',
      'tp_admin': 'Training Partner Admin',
      'tp_staff': 'Training Partner Staff',
      'student': 'Student/Trainee',
      'employer': 'Employer',
      'system_integrator': 'System Integrator/Auditor'
    };
    return roleNames[role] || role;
  }

  // Specific notification methods for easy use throughout the app
  async sendWelcomeEmail(user: NotificationData): Promise<boolean> {
    return this.sendNotification(NotificationType.WELCOME, user, {
      registrationDate: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  }

  async sendAccountApprovalEmail(user: NotificationData): Promise<boolean> {
    const nextStepActions: Record<string, string> = {
      'training_partner': 'Start creating your first training batch',
      'student': 'Browse available training programs',
      'employer': 'Post job opportunities and find candidates',
      'system_integrator': 'Begin reviewing assigned audits'
    };

    return this.sendNotification(NotificationType.ACCOUNT_APPROVED, user, {
      nextStepAction: nextStepActions[user.role] || 'Explore the platform features'
    });
  }

  async sendPasswordResetEmail(user: NotificationData, resetUrl: string): Promise<boolean> {
    return this.sendNotification(NotificationType.PASSWORD_RESET, user, {
      resetUrl
    });
  }

  async sendBatchCreatedNotification(
    trainer: NotificationData,
    batchData: {
      batchId: string;
      batchName: string;
      courseName: string;
      startDate: string;
      duration: string;
      capacity: string;
    }
  ): Promise<boolean> {
    return this.sendNotification(NotificationType.BATCH_CREATED, trainer, {
      ...batchData,
      batchUrl: `https://drishti-fin.vercel.app/batches/${batchData.batchId}`
    });
  }

  async sendPaymentProcessedNotification(
    trainer: NotificationData,
    paymentData: {
      amount: string;
      milestone: string;
      batchName: string;
      transactionId: string;
    }
  ): Promise<boolean> {
    return this.sendNotification(NotificationType.PAYMENT_PROCESSED, trainer, {
      ...paymentData,
      paymentDate: new Date().toLocaleDateString('en-IN'),
      invoiceUrl: `https://drishti-fin.vercel.app/payments/invoice/${paymentData.transactionId}`,
      paymentsUrl: 'https://drishti-fin.vercel.app/payments'
    });
  }

  async sendPlacementVerifiedNotification(
    trainer: NotificationData,
    placementData: {
      studentName: string;
      companyName: string;
      position: string;
      salary: string;
      placementId: string;
    }
  ): Promise<boolean> {
    return this.sendNotification(NotificationType.PLACEMENT_VERIFIED, trainer, {
      ...placementData,
      startDate: new Date().toLocaleDateString('en-IN'),
      placementUrl: `https://drishti-fin.vercel.app/placements/${placementData.placementId}`
    });
  }

  async sendDocumentExpiryAlert(
    user: NotificationData,
    documentData: {
      documentName: string;
      documentType: string;
      expiryDate: string;
      daysRemaining: string;
    }
  ): Promise<boolean> {
    return this.sendNotification(NotificationType.DOCUMENT_EXPIRY, user, {
      ...documentData,
      updateUrl: 'https://drishti-fin.vercel.app/settings/documents'
    });
  }

  async sendApprovalPendingNotification(
    approver: NotificationData,
    approvalData: {
      requestType: string;
      submittedBy: string;
      priority: string;
      referenceId: string;
    }
  ): Promise<boolean> {
    return this.sendNotification(NotificationType.APPROVAL_PENDING, approver, {
      ...approvalData,
      submissionDate: new Date().toLocaleDateString('en-IN'),
      reviewUrl: `https://drishti-fin.vercel.app/approvals/${approvalData.referenceId}`
    });
  }

  // Bulk notification method for multiple recipients
  async sendBulkNotification(
    type: NotificationType,
    recipients: NotificationData[],
    data: Record<string, string>
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const recipient of recipients) {
      const result = await this.sendNotification(type, recipient, data);
      if (result) {
        success++;
      } else {
        failed++;
      }
    }

    return { success, failed };
  }
}

export const notificationService = new NotificationService();
export default NotificationService;