// 1. YOUR SAFE SUPABASE CONNECTION KEYS
const SUPABASE_URL = 'https://ahridkmlgjsmlqkqatrz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmlka21sZ2pzbWxxa3FhdHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNjYwODUsImV4cCI6MjEwNTY0MjA4NX0.r_vPhWLs-hKg7xk6lyge8ITkPP30y53442jrGqNwhWQ';

// Initialize Supabase correctly for browser (renamed to supabaseClient)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. WAIT FOR THE PAGE TO LOAD
document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const loginBtn = document.getElementById("login-btn");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Stop page from refreshing
            
            // Get what the user typed
            const memberId = document.getElementById("member-id").value.trim().toUpperCase();
            const password = document.getElementById("password").value;

            // Clear old errors and show loading text
            errorMessage.textContent = "";
            loginBtn.textContent = "VERIFYING...";
            loginBtn.disabled = true;

            // SECURITY TRICK: Convert Member ID into the hidden auth email format
            const authEmail = `${memberId}@obsidian.circle`.toLowerCase();

            // 3. SEND TO SUPABASE FOR SECURE VERIFICATION
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: authEmail,
                password: password
            });

            if (error) {
                // If wrong password or ID, show error
                errorMessage.textContent = "Authentication Failed: Incorrect ID or Password.";
                loginBtn.textContent = "AUTHENTICATE";
                loginBtn.disabled = false;
            } else {
                // If successful, take them to the Dashboard
                loginBtn.textContent = "ACCESS GRANTED";
                window.location.href = "dashboard.html";
            }
        });
    }
});
