import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
} from '@react-email/components';

interface DemoRequestConfirmationProps {
  firstName: string;
  universityName: string;
}

export const DemoRequestConfirmation: React.FC<DemoRequestConfirmationProps> = ({
  firstName,
  universityName,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          <div style={{ backgroundColor: '#7C3AED', padding: '40px 20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white', margin: 0, fontSize: '32px' }}>
              Thanks for Your Interest!
            </h1>
          </div>

          <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
            <p style={{ fontSize: '18px', color: '#2D3748', marginBottom: '20px' }}>
              Hi {firstName},
            </p>

            <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: '1.6', marginBottom: '20px' }}>
              Thank you for requesting a demo of CoStudy for {universityName}! We&apos;re excited to show you how CoStudy can transform student success at your institution.
            </p>

            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F0FDF4', borderLeft: '4px solid #22C55E', borderRadius: '4px' }}>
              <h2 style={{ fontSize: '18px', color: '#166534', marginTop: 0, marginBottom: '10px' }}>
                What Happens Next?
              </h2>
              <ul style={{ color: '#166534', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
                <li>Our team will review your request within 24 hours</li>
                <li>We&apos;ll reach out to schedule a personalized demo</li>
                <li>You&apos;ll see how CoStudy can help improve student retention and engagement</li>
                <li>We&apos;ll answer all your questions about implementation and pricing</li>
              </ul>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F7FAFC', borderRadius: '8px' }}>
              <h2 style={{ fontSize: '20px', color: '#2D3748', marginTop: 0 }}>
                In the Meantime
              </h2>
              <p style={{ color: '#4A5568', lineHeight: '1.6', marginBottom: '15px' }}>
                Check out these resources to learn more about CoStudy:
              </p>
              <ul style={{ color: '#4A5568', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
                <li><a href="https://costudy.co/features" style={{ color: '#7C3AED' }}>Feature Overview</a> - See what makes CoStudy special</li>
                <li><a href="https://costudy.co/blog" style={{ color: '#7C3AED' }}>Case Studies</a> - Learn how other universities use CoStudy</li>
                <li><a href="https://costudy.co/resources" style={{ color: '#7C3AED' }}>Resources</a> - Implementation guides and best practices</li>
              </ul>
            </div>

            <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: '1.6', marginTop: '30px' }}>
              Have questions before we connect? Feel free to reply to this email.
            </p>

            <p style={{ fontSize: '16px', color: '#4A5568', marginTop: '30px' }}>
              Looking forward to speaking with you soon!<br />
              <strong>The CoStudy Team</strong>
            </p>
          </div>

          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#F7FAFC', fontSize: '14px', color: '#718096' }}>
            <p style={{ margin: '0 0 10px 0' }}>
              CoStudy - Transforming Student Success
            </p>
            <p style={{ margin: 0 }}>
              <a href="https://costudy.co" style={{ color: '#7C3AED', marginRight: '15px' }}>Home</a>
              <a href="https://costudy.co/features" style={{ color: '#7C3AED', marginRight: '15px' }}>Features</a>
              <a href="https://costudy.co/contact" style={{ color: '#7C3AED' }}>Contact</a>
            </p>
          </div>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoRequestConfirmation;
