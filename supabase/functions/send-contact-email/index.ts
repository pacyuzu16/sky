import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  adminEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message, adminEmail }: ContactEmailRequest = await req.json();

    console.log("Sending contact email to:", adminEmail);

    const emailResponse = await resend.emails.send({
      from: "Skyline Consultancy <noreply@resend.dev>",
      to: [adminEmail],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <!-- Header with logo and branding -->
            <div style="background: linear-gradient(135deg, #f7c948 0%, #e6b43f 100%); padding: 30px 40px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div style="margin-right: 15px;">
                  <div style="width: 50px; height: 50px; background-color: #2d2010; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #f7c948; font-size: 24px; font-weight: bold;">S</span>
                  </div>
                </div>
                <div style="text-align: left;">
                  <h1 style="margin: 0; color: #2d2010; font-size: 24px; font-weight: bold;">Skyline Consultancy</h1>
                  <p style="margin: 0; color: #2d2010; font-size: 16px;">& Engineering</p>
                </div>
              </div>
              <p style="margin: 0; color: #2d2010; font-size: 18px; font-weight: 500;">New Contact Form Submission</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #2d2010; margin: 0 0 30px 0; font-size: 24px; border-bottom: 2px solid #f7c948; padding-bottom: 10px;">
                Message from ${name}
              </h2>
              
              <div style="background-color: #fef9e7; border-left: 4px solid #f7c948; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #2d2010; font-size: 18px;">Contact Details</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; align-items: center;">
                    <strong style="color: #2d2010; width: 80px; font-size: 14px;">Name:</strong>
                    <span style="color: #4a4a4a; font-size: 14px;">${name}</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <strong style="color: #2d2010; width: 80px; font-size: 14px;">Email:</strong>
                    <a href="mailto:${email}" style="color: #f7c948; text-decoration: none; font-size: 14px;">${email}</a>
                  </div>
                  ${phone ? `
                  <div style="display: flex; align-items: center;">
                    <strong style="color: #2d2010; width: 80px; font-size: 14px;">Phone:</strong>
                    <a href="tel:${phone}" style="color: #f7c948; text-decoration: none; font-size: 14px;">${phone}</a>
                  </div>` : ''}
                  ${service ? `
                  <div style="display: flex; align-items: center;">
                    <strong style="color: #2d2010; width: 80px; font-size: 14px;">Service:</strong>
                    <span style="color: #4a4a4a; font-size: 14px;">${service}</span>
                  </div>` : ''}
                </div>
              </div>
              
              <div style="background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #2d2010; font-size: 18px;">Message</h3>
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 14px;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}" 
                   style="background: linear-gradient(135deg, #f7c948, #e6b43f); 
                          color: #2d2010; 
                          text-decoration: none; 
                          padding: 12px 30px; 
                          border-radius: 25px; 
                          font-weight: 600; 
                          display: inline-block; 
                          box-shadow: 0 4px 15px rgba(247, 201, 72, 0.3);
                          transition: transform 0.2s ease;">
                  Reply to ${name}
                </a>
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
                  This email was automatically generated from your website contact form.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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