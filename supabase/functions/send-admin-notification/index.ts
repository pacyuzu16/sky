import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  type: string;
  details: Record<string, any>;
  adminEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, details, adminEmail }: AdminNotificationRequest = await req.json();

    console.log(`Sending admin notification (${type}) to:`, adminEmail);

    let subject = "";
    let emailContent = "";

    if (type === "password_change") {
      subject = "🔐 Admin Password Changed - Skyline Consultancy";
      emailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Change Notification</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #f7c948 0%, #e6b43f 100%); padding: 30px 40px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div style="background-color: #2d2010; border-radius: 50%; padding: 15px; margin-right: 15px;">
                  <span style="font-size: 24px;">🔐</span>
                </div>
                <div style="text-align: left;">
                  <h1 style="margin: 0; color: #2d2010; font-size: 24px; font-weight: bold;">Skyline Consultancy</h1>
                  <p style="margin: 0; color: #2d2010; font-size: 16px;">& Engineering</p>
                </div>
              </div>
              <p style="margin: 0; color: #2d2010; font-size: 18px; font-weight: 500;">Security Alert</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <div style="background-color: #fff3cd; border: 1px solid #f7c948; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h2 style="color: #2d2010; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center;">
                  ⚠️ Admin Password Changed
                </h2>
                <p style="color: #4a4a4a; margin: 0; line-height: 1.6;">
                  Your admin panel password has been successfully changed.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #2d2010; font-size: 16px;">Change Details:</h3>
                <div style="display: grid; gap: 10px;">
                  <div style="display: flex;">
                    <strong style="color: #2d2010; width: 120px; font-size: 14px;">Date & Time:</strong>
                    <span style="color: #4a4a4a; font-size: 14px;">${new Date().toLocaleString()}</span>
                  </div>
                  <div style="display: flex;">
                    <strong style="color: #2d2010; width: 120px; font-size: 14px;">IP Address:</strong>
                    <span style="color: #4a4a4a; font-size: 14px;">${details.ipAddress || 'Unknown'}</span>
                  </div>
                  <div style="display: flex;">
                    <strong style="color: #2d2010; width: 120px; font-size: 14px;">User Agent:</strong>
                    <span style="color: #4a4a4a; font-size: 14px; word-break: break-all;">${details.userAgent || 'Unknown'}</span>
                  </div>
                </div>
              </div>
              
              <div style="background-color: #e7f3ff; border: 1px solid #3498db; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #2d2010; font-size: 16px;">Security Recommendations:</h3>
                <ul style="color: #4a4a4a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                  <li>If this wasn't you, immediately check your admin panel security</li>
                  <li>Review recent admin activity logs</li>
                  <li>Consider enabling two-factor authentication</li>
                  <li>Use a strong, unique password for your admin account</li>
                </ul>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2d2010; color: #ffffff; padding: 30px 40px; text-align: center;">
              <div style="margin-bottom: 15px;">
                <strong style="font-size: 16px;">Skyline Consultancy & Engineering</strong>
              </div>
              <div style="font-size: 14px; color: #cccccc; line-height: 1.6;">
                <p style="margin: 5px 0;">📧 skylineconseng@gmail.com</p>
                <p style="margin: 5px 0;">📱 +250 788 447 022</p>
                <p style="margin: 5px 0;">📍 Kigali, Rwanda</p>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
                <p style="margin: 0; font-size: 12px; color: #999;">
                  This is an automated security notification from your admin panel.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Skyline Security <noreply@resend.dev>",
      to: [adminEmail],
      subject,
      html: emailContent,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);