import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewsletterWelcomeEmailProps {
  firstName?: string;
}

export default function NewsletterWelcomeEmail({
  firstName = "there",
}: NewsletterWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to CoStudy Insights - Your Higher Ed Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Welcome to CoStudy Insights! 🎓</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={paragraph}>Hi {firstName},</Text>

            <Text style={paragraph}>
              Thank you for subscribing to CoStudy Insights! We&apos;re excited to share valuable
              content with you about student collaboration, retention strategies, and the latest in
              EdTech innovation.
            </Text>

            <Heading as="h2" style={h2}>
              What to Expect
            </Heading>

            <Text style={paragraph}>
              Every Wednesday at 10 AM EST, you&apos;ll receive our newsletter featuring:
            </Text>

            <ul style={list}>
              <li style={listItem}>
                <strong>Student Success Strategies</strong> - Proven methods to improve retention
                and engagement
              </li>
              <li style={listItem}>
                <strong>EdTech Insights</strong> - Latest trends and tools transforming higher
                education
              </li>
              <li style={listItem}>
                <strong>University Case Studies</strong> - Real-world examples of successful
                implementations
              </li>
              <li style={listItem}>
                <strong>Research & Reports</strong> - Data-driven insights for decision makers
              </li>
              <li style={listItem}>
                <strong>Product Updates</strong> - New features and exclusive webinar invitations
              </li>
            </ul>

            {/* CTA Buttons */}
            <Section style={buttonContainer}>
              <Button
                style={button}
                href="https://costudy.co/blog"
              >
                Read Our Latest Articles
              </Button>
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={secondaryButton}
                href="https://costudy.co/demo"
              >
                Schedule a Demo
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              In the meantime, here are some resources to get you started:
            </Text>

            <ul style={list}>
              <li style={listItem}>
                <Link href="https://costudy.co/products" style={link}>
                  Explore our collaboration tools
                </Link>
              </li>
              <li style={listItem}>
                <Link href="https://costudy.co/resources" style={link}>
                  Browse case studies and success stories
                </Link>
              </li>
              <li style={listItem}>
                <Link href="https://linkedin.com/company/costudy" style={link}>
                  Follow us on LinkedIn
                </Link>
              </li>
            </ul>

            <Text style={paragraph}>
              We&apos;re here to help you transform student collaboration. If you have any
              questions or topics you&apos;d like us to cover, just reply to this email.
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              The CoStudy Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              CoStudy - Transforming Student Collaboration
              <br />
              <Link href="https://costudy.co/newsletter/unsubscribe" style={footerLink}>
                Unsubscribe
              </Link>
              {" | "}
              <Link href="https://costudy.co/privacy" style={footerLink}>
                Privacy Policy
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} CoStudy. All rights reserved.
              <br />
              123 Education Lane, Boston, MA 02115
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#7C3AED",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
};

const h2 = {
  color: "#2D3748",
  fontSize: "22px",
  fontWeight: "bold",
  marginTop: "24px",
  marginBottom: "16px",
};

const content = {
  padding: "0 48px",
};

const paragraph = {
  color: "#4A5568",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const list = {
  color: "#4A5568",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  paddingLeft: "20px",
};

const listItem = {
  marginBottom: "12px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#7C3AED",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  border: "2px solid #7C3AED",
  borderRadius: "8px",
  color: "#7C3AED",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const link = {
  color: "#7C3AED",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#E2E8F0",
  margin: "32px 0",
};

const footer = {
  padding: "0 48px",
  marginTop: "32px",
};

const footerText = {
  color: "#718096",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "8px 0",
};

const footerLink = {
  color: "#7C3AED",
  textDecoration: "underline",
  fontSize: "14px",
};
