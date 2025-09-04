UPDATE admin_settings 
SET setting_value = 'skylineconsengi@gmail.com', updated_at = now() 
WHERE setting_key = 'admin_email';