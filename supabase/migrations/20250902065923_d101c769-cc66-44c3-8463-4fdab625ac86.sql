UPDATE admin_settings 
SET setting_value = 'pacyuzu16@gmail.com', updated_at = now() 
WHERE setting_key = 'admin_email';