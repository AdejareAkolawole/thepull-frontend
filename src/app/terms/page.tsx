"use client";
import Image from "next/image";

const WINE = "#7c2232";
const CREAM = "#f5f0e8";
const DARK = "#2d1a14";
const MID = "#7c5c50";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid rgba(45,26,20,0.1)` }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: MID }}>
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100dvh", background: CREAM }}>
      {/* Header */}
      <div style={{ background: WINE, padding: "24px 24px 32px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <button
            onClick={() => window.history.back()}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, padding: "6px 14px", cursor: "pointer", marginBottom: 24 }}
          >
            ← Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 40, height: 48, position: "relative", flexShrink: 0 }}>
              <Image src="/logo.jpg" alt="ThePull" fill style={{ objectFit: "contain" }} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>ThePull</p>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Terms of Service</h1>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            Effective August 21, 2026 · GravityPullIndex, Inc.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 24px 80px" }}>

        <Section title="About these terms">
          <p>
            The Pull is operated by GravityPullIndex, Inc. The Pull is intelligence for understanding yourself and your relationships.
            By creating an account or using The Pull, you agree to these Terms.
          </p>
        </Section>

        <Section title="Eligibility">
          <p>
            You must be at least the age of majority in your jurisdiction and able to form a binding contract to use The Pull.
          </p>
        </Section>

        <Section title="Your account">
          <p>
            You are responsible for keeping your account credentials secure and for activity under your account.
            You agree to provide accurate information and to keep it current.
          </p>
        </Section>

        <Section title="Your information and responsibilities">
          <p>
            You are responsible for the information you provide, including profile details, assessment responses, notes,
            and information about other people you add to your Vault. You confirm that you have the right to add and store
            any information about another person that you enter, and that doing so complies with applicable law.
          </p>
          <p style={{ marginTop: 10 }}>
            You agree not to misuse the service, including not to reverse-engineer, scrape, or attempt to access data that is not yours,
            and not to interfere with the service&apos;s operation.
          </p>
        </Section>

        <Section title="Use of the service">
          <p>
            The Pull provides intelligence outputs generated from the information you provide. These outputs are tools for understanding
            yourself and your relationships. They are not diagnostic, therapeutic, medical, or psychological advice, and they are not
            guaranteed predictions of any person or outcome.
          </p>
        </Section>

        <Section title="Intellectual property">
          <p>
            GravityPullIndex, Inc. owns The Pull, its design, and its content, excluding your user information. You retain your user information.
            The intelligence methodologies, scoring, prompts, and engine internals are proprietary and are not licensed to you.
          </p>
        </Section>

        <Section title="Subscriptions, billing, and recurring charges">
          <p>
            Some features require a paid subscription. Paid subscriptions recur automatically (for example, monthly or annually) until you cancel.
            When you subscribe, you authorize recurring charges to your payment method through Stripe.
          </p>
          <p style={{ marginTop: 10 }}>
            Your subscription remains active until the end of the current billing period, even after you cancel,
            and you retain access for that period.
          </p>
        </Section>

        <Section title="Cancellation">
          <p>
            You can cancel your subscription at any time from <strong>Settings → Subscription</strong>. Cancelling stops future renewals;
            access continues until the end of your current paid period. Deleting your account also cancels any active subscription.
          </p>
        </Section>

        <Section title="Refunds">
          <p>
            Refund requests are handled individually. To request a refund, contact us at{" "}
            <a href="mailto:support@gravitypullindex.com" style={{ color: WINE, fontWeight: 600 }}>support@gravitypullindex.com</a>.
            We do not promise a refund in every case, and we do not state an absolute no-refund rule.
            Any refund that may be granted is at our discretion based on the circumstances.
          </p>
        </Section>

        <Section title="Payment failures">
          <p>
            If a payment fails, your subscription may lapse or be suspended. Access to paid features ends if the subscription
            is not successfully renewed or restored.
          </p>
        </Section>

        <Section title="Account suspension and termination">
          <p>
            We may suspend or terminate access if these Terms are violated, or to protect the service or others.
            You can terminate your account at any time by deleting it.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            You agree not to use The Pull to harm others, to input information you do not have the right to add,
            or to use the service for any unlawful purpose.
          </p>
        </Section>

        <Section title="AI and intelligence outputs">
          <p>
            Some outputs may be produced or assisted by automated or AI systems. These outputs are informational and should be understood
            in context. You remain responsible for your decisions. Outputs are not professional advice and are not a substitute for
            professional judgment.
          </p>
        </Section>

        <Section title="Limitations">
          <p>
            The Pull is provided &quot;as is.&quot; To the fullest extent permitted by law, GravityPullIndex, Inc. is not liable for indirect,
            incidental, or consequential damages, or for any loss arising from your reliance on outputs or your inability to use the service.
          </p>
        </Section>

        <Section title="Professional-advice boundary">
          <p>
            The Pull does not provide medical, psychological, legal, or financial advice. If you are facing a serious situation,
            please seek assistance from a qualified professional.
          </p>
        </Section>

        <Section title="Changes to the service and these terms">
          <p>
            We may update the service and these Terms. When we make material changes to these Terms, we will update the effective date
            and, where appropriate, ask you to accept the updated Terms.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            Your use of The Pull is at your own risk. GravityPullIndex, Inc. is not responsible for decisions you make based on the service.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These Terms do not specify a governing jurisdiction unless and until one is formally approved and documented.
            Until then, disputes will be addressed in good faith through the contact below.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For questions about these Terms, email{" "}
            <a href="mailto:support@gravitypullindex.com" style={{ color: WINE, fontWeight: 600 }}>support@gravitypullindex.com</a>,
            or visit{" "}
            <a href="https://mypullscore.com/support" style={{ color: WINE, fontWeight: 600 }}>our support page</a>.
          </p>
        </Section>

        <div style={{ borderTop: `1px solid rgba(45,26,20,0.1)`, paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: MID }}>© 2026 GravityPullIndex, Inc. · All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
