import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
} from '@react-email/components';

interface DemoRequestSalesNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  universityName: string;
  universityWebsite?: string;
  studentCount?: string;
  role: string;
  department?: string;
  goals?: string[];
  timeline?: string;
  message?: string;
  referralSource?: string;
}

export const DemoRequestSalesNotification: React.FC<DemoRequestSalesNotificationProps> = ({
  firstName,
  lastName,
  email,
  phone,
  universityName,
  universityWebsite,
  studentCount,
  role,
  department,
  goals,
  timeline,
  message,
  referralSource,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          <div style={{ backgroundColor: '#7C3AED', padding: '30px 20px', textAlign: 'center' }}>
            <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>
              New Demo Request
            </h1>
          </div>

          <div style={{ padding: '30px 20px', backgroundColor: '#ffffff' }}>
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#FEF3C7', borderLeft: '4px solid #F59E0B', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '16px', color: '#92400E', fontWeight: '600' }}>
                Action Required: Follow up within 24 hours
              </p>
            </div>

            <h2 style={{ fontSize: '22px', color: '#2D3748', marginTop: '0', marginBottom: '20px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
              University Information
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600', width: '35%' }}>University:</td>
                  <td style={{ padding: '10px 0', color: '#2D3748' }}>{universityName}</td>
                </tr>
                {universityWebsite && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Website:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>
                      <a href={universityWebsite} style={{ color: '#7C3AED' }}>{universityWebsite}</a>
                    </td>
                  </tr>
                )}
                {studentCount && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Student Count:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>{studentCount}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2 style={{ fontSize: '22px', color: '#2D3748', marginTop: '0', marginBottom: '20px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
              Contact Information
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600', width: '35%' }}>Name:</td>
                  <td style={{ padding: '10px 0', color: '#2D3748' }}>{firstName} {lastName}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Email:</td>
                  <td style={{ padding: '10px 0', color: '#2D3748' }}>
                    <a href={`mailto:${email}`} style={{ color: '#7C3AED' }}>{email}</a>
                  </td>
                </tr>
                {phone && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Phone:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>
                      <a href={`tel:${phone}`} style={{ color: '#7C3AED' }}>{phone}</a>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Role:</td>
                  <td style={{ padding: '10px 0', color: '#2D3748' }}>{role}</td>
                </tr>
                {department && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Department:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>{department}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2 style={{ fontSize: '22px', color: '#2D3748', marginTop: '0', marginBottom: '20px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
              Use Case Details
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                {goals && goals.length > 0 && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600', width: '35%', verticalAlign: 'top' }}>Goals:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {goals.map((goal, idx) => (
                          <li key={idx}>{goal}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
                {timeline && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Timeline:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>{timeline}</td>
                  </tr>
                )}
                {referralSource && (
                  <tr>
                    <td style={{ padding: '10px 0', color: '#718096', fontWeight: '600' }}>Referral Source:</td>
                    <td style={{ padding: '10px 0', color: '#2D3748' }}>{referralSource}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {message && (
              <>
                <h2 style={{ fontSize: '22px', color: '#2D3748', marginTop: '0', marginBottom: '20px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
                  Additional Message
                </h2>
                <div style={{ padding: '15px', backgroundColor: '#F7FAFC', borderRadius: '8px', marginBottom: '30px' }}>
                  <p style={{ margin: 0, color: '#2D3748', whiteSpace: 'pre-wrap' }}>{message}</p>
                </div>
              </>
            )}

            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#DBEAFE', borderLeft: '4px solid #3B82F6', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#1E40AF' }}>
                <strong>Next Steps:</strong> Respond to {email} within 24 hours to schedule a demo. Use the Calendly link to book a time that works for both parties.
              </p>
            </div>
          </div>

          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#F7FAFC', fontSize: '14px', color: '#718096' }}>
            <p style={{ margin: 0 }}>
              Demo Request submitted at {new Date().toLocaleString()}
            </p>
          </div>
        </Container>
      </Body>
    </Html>
  );
};

export default DemoRequestSalesNotification;
