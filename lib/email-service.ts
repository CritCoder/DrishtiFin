interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody?: string;
}

interface PostmarkConfig {
  serverToken: string;
  fromEmail: string;
  messageStream: string;
}

class EmailService {
  private config: PostmarkConfig;

  constructor(config: PostmarkConfig) {
    this.config = config;
  }

  async sendEmail(
    to: string | string[],
    template: EmailTemplate,
    variables: Record<string, string> = {}
  ): Promise<boolean> {
    try {
      const recipients = Array.isArray(to) ? to : [to];
      
      // Replace variables in template
      let subject = template.subject;
      let htmlBody = template.htmlBody;
      let textBody = template.textBody || '';

      Object.keys(variables).forEach(key => {
        const value = variables[key];
        subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value);
        htmlBody = htmlBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
        textBody = textBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });

      for (const recipient of recipients) {
        const response = await fetch('https://api.postmarkapp.com/email', {
          method: 'POST',
          headers: {
            'X-Postmark-Server-Token': this.config.serverToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            From: this.config.fromEmail,
            To: recipient,
            Subject: subject,
            HtmlBody: htmlBody,
            TextBody: textBody,
            MessageStream: this.config.messageStream,
          }),
        });

        if (!response.ok) {
          console.error(`Failed to send email to ${recipient}:`, await response.text());
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }
}

// Email templates
export const emailTemplates = {
  // Authentication Templates
  welcome: {
    subject: 'Welcome to DRISHTI - Your Account is Ready! 🎉',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; font-weight: bold; color: white; font-family: serif;">D</span>
          </div>
          <h1 style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 16px 0; font-family: serif;">Welcome to DRISHTI</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin: 0;">One Platform to Streamline All Training Analytics</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Hello {{userName}},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Your DRISHTI account has been successfully created! You're now part of India's premier training partner management platform.
          </p>
          
          <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Account Details</h3>
            <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Email:</strong> {{userEmail}}</p>
            <p style="color: #6b7280; margin: 0 0 8px 0;"><strong>Role:</strong> {{userRole}}</p>
            <p style="color: #6b7280; margin: 0;"><strong>Registration Date:</strong> {{registrationDate}}</p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{loginUrl}}" style="background: #1f2937; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Access Your Dashboard →
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 32px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Need help? Contact our support team at <a href="mailto:support@drishti.gov.in" style="color: #3b82f6;">support@drishti.gov.in</a>
            </p>
          </div>
        </div>
      </div>
    `
  },

  accountApproved: {
    subject: 'Account Approved - Access Granted to DRISHTI Platform ✅',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">✅</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Account Approved!</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Your DRISHTI account has been approved and activated</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Congratulations {{userName}}!</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Your account has been reviewed and approved. You now have full access to the DRISHTI platform with {{userRole}} permissions.
          </p>
          
          <div style="background: #f0fdf4; border: 1px solid #16a34a; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #16a34a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">What's Next?</h3>
            <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Complete your profile setup</li>
              <li>Explore the dashboard features</li>
              <li>{{nextStepAction}}</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{dashboardUrl}}" style="background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Access Dashboard →
            </a>
          </div>
        </div>
      </div>
    `
  },

  passwordReset: {
    subject: 'Password Reset Request - DRISHTI Platform 🔒',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">🔒</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Password Reset</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Secure password reset for your DRISHTI account</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Reset Your Password</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            We received a request to reset your password. If you didn't make this request, please ignore this email.
          </p>
          
          <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="color: #dc2626; font-weight: 600; margin: 0 0 12px 0;">⚠️ Security Notice</p>
            <p style="color: #7f1d1d; font-size: 14px; margin: 0; line-height: 1.5;">
              This reset link will expire in 1 hour for security reasons. If you didn't request this reset, please contact our support team immediately.
            </p>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{resetUrl}}" style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Reset Password →
            </a>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 32px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              If you can't click the button, copy this link: <br>
              <a href="{{resetUrl}}" style="color: #3b82f6; word-break: break-all;">{{resetUrl}}</a>
            </p>
          </div>
        </div>
      </div>
    `
  },

  // Training Partner Templates
  batchCreated: {
    subject: 'New Training Batch Created - {{batchName}} 🎓',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">🎓</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Batch Created Successfully</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Your new training batch is ready to begin</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">{{batchName}}</h2>
          
          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #3b82f6; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Batch Details</h3>
            <div style="color: #1e40af;">
              <p style="margin: 0 0 8px 0;"><strong>Batch ID:</strong> {{batchId}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Course:</strong> {{courseName}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Start Date:</strong> {{startDate}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Duration:</strong> {{duration}}</p>
              <p style="margin: 0;"><strong>Capacity:</strong> {{capacity}} students</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{batchUrl}}" style="background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Manage Batch →
            </a>
          </div>
        </div>
      </div>
    `
  },

  paymentProcessed: {
    subject: 'Payment Processed - Milestone {{milestone}} Completed 💰',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">💰</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Payment Processed</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Milestone payment has been successfully transferred</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Payment Confirmation</h2>
          
          <div style="background: #f0fdf4; border: 1px solid #16a34a; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #16a34a; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Transaction Details</h3>
            <div style="color: #166534;">
              <p style="margin: 0 0 8px 0;"><strong>Amount:</strong> ₹{{amount}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Milestone:</strong> {{milestone}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Batch:</strong> {{batchName}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Transaction ID:</strong> {{transactionId}}</p>
              <p style="margin: 0;"><strong>Date:</strong> {{paymentDate}}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{invoiceUrl}}" style="background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; margin-right: 12px;">
              Download Invoice →
            </a>
            <a href="{{paymentsUrl}}" style="background: transparent; color: #16a34a; border: 2px solid #16a34a; padding: 12px 26px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              View All Payments
            </a>
          </div>
        </div>
      </div>
    `
  },

  // Placement Templates
  placementVerified: {
    subject: 'Placement Verified - {{studentName}} Successfully Placed! 🎉',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">🎉</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Placement Verified!</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Another successful career journey begins</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Success Story</h2>
          
          <div style="background: #f5f3ff; border: 1px solid #7c3aed; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #7c3aed; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Placement Details</h3>
            <div style="color: #5b21b6;">
              <p style="margin: 0 0 8px 0;"><strong>Student:</strong> {{studentName}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Company:</strong> {{companyName}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Position:</strong> {{position}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Salary:</strong> ₹{{salary}} per annum</p>
              <p style="margin: 0;"><strong>Start Date:</strong> {{startDate}}</p>
            </div>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            This placement has been verified and will contribute to your performance metrics. Congratulations on another successful training outcome!
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{placementUrl}}" style="background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              View Placement Details →
            </a>
          </div>
        </div>
      </div>
    `
  },

  // System Notification Templates
  documentExpiry: {
    subject: 'Document Expiry Alert - Action Required ⚠️',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">⚠️</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Document Expiring Soon</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Immediate action required to maintain compliance</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Urgent: Update Required</h2>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #d97706; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Expiring Document</h3>
            <div style="color: #92400e;">
              <p style="margin: 0 0 8px 0;"><strong>Document:</strong> {{documentName}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Type:</strong> {{documentType}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Current Expiry:</strong> {{expiryDate}}</p>
              <p style="margin: 0;"><strong>Days Remaining:</strong> {{daysRemaining}} days</p>
            </div>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            To maintain your active status and continue operations, please update this document before the expiry date.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{updateUrl}}" style="background: #f59e0b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Update Document →
            </a>
          </div>
        </div>
      </div>
    `
  },

  // Approval Workflow Templates
  approvalPending: {
    subject: 'New Approval Request - {{requestType}} Awaiting Review 📋',
    htmlBody: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 40px 20px; text-align: center;">
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">
            <span style="font-size: 36px; color: white;">📋</span>
          </div>
          <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Approval Required</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">New request awaiting your review</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Review Request</h2>
          
          <div style="background: #ecfeff; border: 1px solid #0891b2; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #0891b2; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Request Details</h3>
            <div style="color: #155e75;">
              <p style="margin: 0 0 8px 0;"><strong>Type:</strong> {{requestType}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Submitted By:</strong> {{submittedBy}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Date:</strong> {{submissionDate}}</p>
              <p style="margin: 0 0 8px 0;"><strong>Priority:</strong> {{priority}}</p>
              <p style="margin: 0;"><strong>Reference:</strong> {{referenceId}}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="{{reviewUrl}}" style="background: #0891b2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Review & Approve →
            </a>
          </div>
        </div>
      </div>
    `
  }
};

// Create email service instance
export const createEmailService = () => {
  return new EmailService({
    serverToken: '66fafdf6-510f-4993-b2c2-f684c344bf39',
    fromEmail: 'no-reply@bot9.ai',
    messageStream: 'bot9'
  });
};

export default EmailService;