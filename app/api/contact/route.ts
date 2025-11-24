import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate environment variables
        if (!process.env.EMAIL_PASSWORD) {
            console.error('Missing EMAIL_PASSWORD environment variable');
            return NextResponse.json(
                { error: 'Server configuration error. Please contact the administrator.' },
                { status: 500 }
            );
        }

        // Create transporter using Gmail
        // You'll need to set up App Password in your Gmail account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'nagasai.akula.dev@gmail.com',
                pass: process.env.EMAIL_PASSWORD, // Use App Password, not regular password
            },
        });

        // Email to yourself
        const mailOptions = {
            from: process.env.EMAIL_USER || 'nagasai.akula.dev@gmail.com',
            to: 'nagasai.akula.dev@gmail.com',
            subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Reply to: ${email}</small></p>
            `,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully to:', 'nagasai.akula.dev@gmail.com');

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}
