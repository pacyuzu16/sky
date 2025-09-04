-- Add DELETE policy for contact messages
CREATE POLICY "Admin can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (true);