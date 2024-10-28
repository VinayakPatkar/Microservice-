export function generateAccountVerificationEmailTemplate(verificationLink: string, name: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <h1>Account Verification</h1>
        <p>Hello ${name},</p>
        <p>Thank you for registering! Please verify your account by clicking the button below:</p>
        <a href="${verificationLink}" class="button">Verify Account</a>
        <p>If you didn’t create an account, you can safely ignore this email.</p>
        <p>Thanks,<br>Your Company Name</p>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
    </body>
    </html>`;
}

export function generateResetPasswordEmailTemplate(resetLink: string, name: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
                text-align: center;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, you can ignore this email.</p>
        <p>Thanks,<br>Your Company Name</p>
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
    </body>
    </html>`;
}
