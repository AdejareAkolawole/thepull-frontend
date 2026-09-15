"use client";
import Image from "next/image";

const WINE = "#7c2232";
const CREAM = "#f5f0e8";
const DARK = "#2d1a14";
const MID = "#7c5c50";
const GOLD = "#b8922a";

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

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
      <span style={{ color: WINE, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>·</span>
      <span>{children}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}30`, borderRadius: 10, padding: "12px 16px", marginTop: 16, fontSize: 13, color: DARK, lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

export default function PrivacyPage() {
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
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Privacy Policy</h1>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            Effective August 21, 2026 · GravityPullIndex, Inc.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px 24px 80px" }}>

        <Section title="Overview">
          <p>
            The Pull is operated by GravityPullIndex, Inc. The Pull is intelligence for understanding yourself and your relationships.
            This Privacy Policy describes the information we collect, why we collect it, how we use and store it, your choices, and how to delete it.
          </p>
          <p style={{ marginTop: 10 }}>
            This policy applies only to The Pull. It does not describe any unrelated corporate practices of GravityPullIndex, Inc.
          </p>
        </Section>

        <Section title="Information we collect">
          <p style={{ marginBottom: 14 }}>We collect the information you provide directly and the information generated as you use The Pull:</p>
          <Bullet><strong>Account:</strong> your email address, full name, and authentication information.</Bullet>
          <Bullet><strong>Profile:</strong> your display name, birth date, birth time, birthplace, location/timezone context, relationship status, and the goals and concerns you share.</Bullet>
          <Bullet><strong>Assessment and intelligence:</strong> your question responses, assessment state, evidence, intelligence results, and fusion/archetype outputs that The Pull generates from your responses.</Bullet>
          <Bullet><strong>Relationships and Vault:</strong> the people you add, including nicknames, relationship type and status, birth data, notes, and photos you choose to store.</Bullet>
          <Bullet><strong>Reflective entries:</strong> your journal entries, no-contact entries, and Ask The Pull conversation information and memory.</Bullet>
          <Bullet><strong>Billing:</strong> subscription and entitlement metadata (plan, status, usage), and payment processing handled by our payment provider, Stripe.</Bullet>
          <Bullet><strong>Support:</strong> the communications you send us when you request help.</Bullet>
          <Bullet><strong>Security and audit:</strong> the limited metadata necessary for security and integrity, such as audit records of significant account actions.</Bullet>
        </Section>

        <Section title="Why we collect and how we use it">
          <Bullet>To create and maintain your account and authenticate you.</Bullet>
          <Bullet>To build your profile, run the intelligence engines, and produce your Pull Score, archetype, and related outputs.</Bullet>
          <Bullet>To let you store and revisit information about people and your reflections.</Bullet>
          <Bullet>To manage your subscription, entitlements, and usage.</Bullet>
          <Bullet>To provide support and respond to your requests.</Bullet>
          <Bullet>To maintain the security and integrity of the service.</Bullet>
        </Section>

        <Section title="How it is stored">
          <p>
            Your account and application data are stored on our backend infrastructure hosted via Railway. Payment data is processed by Stripe;
            we do not store full card numbers — Stripe handles card data according to its own standards.
            We store only the subscription and entitlement metadata needed to manage your plan.
          </p>
        </Section>

        <Section title="How it is shared">
          <p>
            Your assessment responses, intelligence results, profile, Vault, journal, and Ask The Pull information are private to your account.
            Other users cannot see your profiles, results, or reflections.
          </p>
          <p style={{ marginTop: 10 }}>
            We share information only as necessary to operate the service — for example, with our hosting infrastructure and our payment provider (Stripe) —
            and where required by law. We do not sell your personal information.
          </p>
        </Section>

        <Section title="AI and language models">
          <p>
            Some The Pull experiences use AI systems, including language-model features. Depending on the feature, information such as profile context,
            journal snippets, conversation history, or synthesized intelligence may be sent to a language model to generate a response.
          </p>
          <p style={{ marginTop: 10 }}>
            Potential model providers include Anthropic (Claude), OpenAI (GPT), and Google (Gemini). We do not make guarantees about
            provider-side training or retention practices unless and until they are conclusively verified by the applicable provider documentation.
          </p>
          <Note>
            <strong>Unresolved item for verification:</strong> Whether language-model providers (Anthropic, OpenAI, Google) use submitted content
            to train their models, and their retention of submitted content, depends on each provider&apos;s current API terms and configuration.
            We have not independently verified a definitive &quot;we never use your data to train AI models&quot; assurance.
            Please contact us for the current status before relying on any such assurance.
          </Note>
        </Section>

        <Section title="Your choices">
          <Bullet>You can edit your profile details and relationship information within The Pull.</Bullet>
          <Bullet>You can manage your subscription and cancel it from Settings.</Bullet>
          <Bullet>You can delete your account and its data from Settings, or through the account-deletion page.</Bullet>
        </Section>

        <Section title="Account deletion">
          <p>
            You can delete your account from <strong>Settings → Account → Delete Account</strong>, or from the public account-deletion page.
            Deletion removes your profile, intelligence results, assessment responses, relationship records, reports, journal, and other personally attributable data.
            A limited set of security/audit metadata may be retained where necessary for integrity.
          </p>
          <p style={{ marginTop: 10 }}>
            The underlying authentication record is managed at the platform level. Where platform capabilities limit deletion of that specific record,
            we remove your personal data and end your access, which is the maximum the application layer can guarantee.
          </p>
        </Section>

        <Section title="Retention">
          <p>
            We retain your information for as long as your account is active. When you delete your account, we remove your personal data as described above,
            except for limited security/audit metadata retained where necessary. We do not assert specific retention periods beyond what is described here.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We use reasonable measures to protect your information, including private, account-scoped data access and server-side handling of sensitive operations.
            No method of transmission or storage is completely secure, and we do not guarantee absolute security.
          </p>
        </Section>

        <Section title="Privacy rights">
          <p>
            Depending on where you live, you may have rights to access, correct, or delete your personal information, or to object to certain processing.
            You can exercise many of these directly in The Pull, or by contacting us.
          </p>
        </Section>

        <Section title="International processing">
          <p>
            The Pull is operated by GravityPullIndex, Inc. and uses Railway and Stripe for processing.
            Your information may be processed outside your country of residence through these providers.
            We do not assert a specific processing jurisdiction beyond what these providers&apos; documentation confirms.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For privacy questions or data requests, email us at{" "}
            <a href="mailto:support@gravitypullindex.com" style={{ color: WINE, fontWeight: 600 }}>support@gravitypullindex.com</a>,
            or visit{" "}
            <a href="https://mypullscore.com/support" style={{ color: WINE, fontWeight: 600 }}>our support page</a>.
          </p>
          <p style={{ marginTop: 8 }}>
            Website:{" "}
            <a href="https://mypullscore.com" style={{ color: WINE, fontWeight: 600 }}>mypullscore.com</a>
          </p>
        </Section>

        <div style={{ borderTop: `1px solid rgba(45,26,20,0.1)`, paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: MID }}>© 2026 GravityPullIndex, Inc. · All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
