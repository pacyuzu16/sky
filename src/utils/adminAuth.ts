// Secure admin authentication utility
// This file is intentionally placed deep in the utils to make it harder to find

const ADMIN_CONFIG = {
  // Base64 encoded and reversed for basic obfuscation
  key: "IXFYMnY5UjA=", // Represents the actual password in a slightly obfuscated way
  salt: "skyline_admin_2024",
  sessionTimeout: 8 * 60 * 60 * 1000 // 8 hours
};

// Simple hard-coded password validation
export const validateAdminAccess = (inputPassword: string): boolean => {
  // Hard-coded password for admin access
  const ADMIN_PASSWORD = "R9v#2Xq!";
  return inputPassword === ADMIN_PASSWORD;
};

export const createAdminSession = (): void => {
  const sessionData = {
    authenticated: true,
    timestamp: Date.now(),
    expires: Date.now() + ADMIN_CONFIG.sessionTimeout,
    token: btoa(`${ADMIN_CONFIG.salt}_${Date.now()}`)
  };
  
  localStorage.setItem('admin_session', JSON.stringify(sessionData));
  localStorage.setItem('admin_authenticated', 'true');
  localStorage.setItem('admin_login_time', Date.now().toString());
};

export const validateAdminSession = (): boolean => {
  try {
    const sessionData = localStorage.getItem('admin_session');
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    return session.authenticated && Date.now() < session.expires;
  } catch {
    return false;
  }
};

export const clearAdminSession = (): void => {
  localStorage.removeItem('admin_session');
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_login_time');
};