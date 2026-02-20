/**
 * Service for submitting email to Google Sheets via Google Apps Script webhook
 */

export interface SubmitResponse {
  success: boolean;
  message: string;
}

/**
 * Submits email to Google Sheets
 * Requires NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL environment variable
 */
export async function submitEmailToGoogleSheets(
  email: string
): Promise<SubmitResponse> {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Google Sheets webhook URL is not configured');
    return {
      success: false,
      message: 'Service configuration error. Please try again later.',
    };
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      success: true,
      message: 'Thank you! We will contact you soon.',
    };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      success: false,
      message: 'Failed to submit. Please try again.',
    };
  }
}
