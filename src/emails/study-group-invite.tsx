import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
} from '@react-email/components';

interface StudyGroupInviteProps {
  recipientName: string;
  inviterName: string;
  groupName: string;
  className: string;
  nextSessionDate?: string;
  acceptUrl: string;
}

export const StudyGroupInviteEmail: React.FC<StudyGroupInviteProps> = ({
  recipientName,
  inviterName,
  groupName,
  className,
  nextSessionDate,
  acceptUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      <div style={{ backgroundColor: '#7C3AED', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>
          You've Been Invited! 📚
        </h1>
      </div>

      <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: '18px', color: '#2D3748', marginBottom: '20px' }}>
          Hi {recipientName},
        </p>

        <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: '1.6', marginBottom: '20px' }}>
          <strong>{inviterName}</strong> has invited you to join their study group on CoStudy!
        </p>

        <div style={{
          padding: '25px',
          backgroundColor: '#F7FAFC',
          borderRadius: '8px',
          borderLeft: '4px solid #7C3AED',
          marginBottom: '30px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#718096', textTransform: 'uppercase', fontWeight: '600' }}>
            Study Group Details
          </p>
          <h2 style={{ fontSize: '22px', color: '#2D3748', margin: '0 0 10px 0' }}>
            {groupName}
          </h2>
          <p style={{ fontSize: '16px', color: '#4A5568', margin: '0 0 8px 0' }}>
            📖 <strong>Class:</strong> {className}
          </p>
          {nextSessionDate && (
            <p style={{ fontSize: '16px', color: '#4A5568', margin: 0 }}>
              📅 <strong>Next Session:</strong> {nextSessionDate}
            </p>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <a
            href={acceptUrl}
            style={{
              backgroundColor: '#7C3AED',
              color: 'white',
              padding: '16px 40px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            Join Study Group
          </a>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
          <h3 style={{ fontSize: '16px', color: '#065F46', marginTop: 0, marginBottom: '12px' }}>
            ✨ Benefits of Studying Together
          </h3>
          <ul style={{ color: '#047857', lineHeight: '1.8', paddingLeft: '20px', marginBottom: 0 }}>
            <li>Learn faster through collaborative discussion</li>
            <li>Stay motivated and accountable</li>
            <li>Share notes and study resources</li>
            <li>Get help when you're stuck</li>
          </ul>
        </div>

        <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6', marginTop: '30px', textAlign: 'center' }}>
          Not interested? You can safely ignore this email.
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

export default StudyGroupInviteEmail;
