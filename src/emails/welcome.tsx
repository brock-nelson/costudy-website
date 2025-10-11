import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
} from '@react-email/components';

interface WelcomeEmailProps {
  firstName: string;
  verificationUrl?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  firstName,
  verificationUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      <div style={{ backgroundColor: '#7C3AED', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '32px' }}>
          Welcome to CoStudy! 🎓
        </h1>
      </div>

      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', color: '#2D3748', marginBottom: '20px' }}>
          Hi {firstName},
        </p>

        <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: '1.6', marginBottom: '20px' }}>
          We&apos;re excited to have you join CoStudy! You&apos;re now part of a community of students
          who are transforming how they study together.
        </p>

        {verificationUrl && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a
              href={verificationUrl}
              style={{
                backgroundColor: '#7C3AED',
                color: 'white',
                padding: '14px 32px',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-block',
              }}
            >
              Verify Your Email
            </a>
          </div>
        )}

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F7FAFC', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', color: '#2D3748', marginTop: 0 }}>
            🚀 Getting Started
          </h2>
          <ul style={{ color: '#4A5568', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Complete your profile with your university and major</li>
            <li>Browse study groups or create your own</li>
            <li>Connect with students in your classes</li>
            <li>Schedule your first study session</li>
          </ul>
        </div>

        <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: '1.6', marginTop: '30px' }}>
          Need help? Just reply to this email or check out our{' '}
          <a href="https://costudy.co/help" style={{ color: '#7C3AED' }}>Help Center</a>.
        </p>

        <p style={{ fontSize: '16px', color: '#4A5568', marginTop: '30px' }}>
          Happy studying! 📚<br />
          <strong>The CoStudy Team</strong>
        </p>
      </div>

      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#F7FAFC', fontSize: '14px', color: '#718096' }}>
        <p style={{ margin: '0 0 10px 0' }}>
          CoStudy - Study Together, Succeed Together
        </p>
        <p style={{ margin: 0 }}>
          <a href="https://costudy.co" style={{ color: '#7C3AED', marginRight: '15px' }}>Home</a>
          <a href="https://costudy.co/blog" style={{ color: '#7C3AED', marginRight: '15px' }}>Blog</a>
          <a href="https://costudy.co/help" style={{ color: '#7C3AED' }}>Help</a>
        </p>
      </div>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
