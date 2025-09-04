-- Ensure admin_settings table has email setting
INSERT INTO admin_settings (setting_key, setting_value) 
VALUES ('admin_email', 'pacyuzu16@gmail.com')
ON CONFLICT (setting_key) DO NOTHING;