import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { siteConfig } from "@/lib/config"
import { Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.brand.name}`,
  description: `Learn how ${siteConfig.brand.name} collects, uses, and protects your personal information.`,
  openGraph: {
    title: `Privacy Policy | ${siteConfig.brand.name}`,
    description: `Learn how ${siteConfig.brand.name} collects, uses, and protects your personal information.`,
    type: "website",
  },
}

export default function PrivacyPage() {
  // Extract domain from URL
  const domain = siteConfig.brand.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  
  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Shield className="size-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>

          <div className="prose prose-green max-w-none space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">Last Updated: January 15, 2025</p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {siteConfig.brand.name} ("{siteConfig.brand.name}," "Site," "we," "us," or "our") is a brand owned and operated by Bane
                Digital, LLC ("Bane Digital"), a Delaware limited liability company organized under the laws of the
                State of Delaware, United States, with its principal business address at:
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                651 N. Broad St., Suite 201
                <br />
                Middletown, DE 19709 USA
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how we collect, use, disclose, and safeguard information in connection
                with your use of our website at {domain} and any related content, email newsletters, or
                services (collectively, the "Services").
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Services, you acknowledge that you have read and understood this Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Scope</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Privacy Policy applies to information we collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Through our website {domain}</li>
                <li>Through email newsletters and other communications we send</li>
                <li>Through any forms, surveys, or interactive features we operate</li>
                <li>
                  Through third-party platforms when you interact with our content there and they share information with
                  us (as permitted by their own privacy policies)
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This Privacy Policy does not apply to third-party websites, apps, or services that we do not control,
                even if they link to or from our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect three broad categories of information.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">3.1 Information You Provide Directly</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may provide us with personal information when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Sign up for our email newsletter</li>
                <li>Submit a contact form or inquiry</li>
                <li>Comment on blog posts (if comments are enabled)</li>
                <li>Participate in surveys, promotions, or giveaways</li>
                <li>Otherwise communicate with us</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4 mb-4">This can include:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Any information you include in messages or comments</li>
                <li>Preferences related to the topics you follow or content you request</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">
                3.2 Information We Collect Automatically
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you visit or use the Services, we may automatically collect certain information about your device
                and usage, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Referring and exit URLs</li>
                <li>Pages viewed, links clicked, and other actions on the Site</li>
                <li>Dates and times of visits</li>
                <li>General location information (e.g., city/region) based on IP address</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We may use cookies, pixels, web beacons, log files, and similar technologies to collect this
                information.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">3.3 Information from Third Parties</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may receive information about you from third parties, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Analytics providers (e.g., Google Analytics)</li>
                <li>Advertising networks (e.g., Google AdSense and other ad partners)</li>
                <li>Email service providers / marketing tools</li>
                <li>Social media platforms, if you interact with our content there</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The information we receive will depend on the privacy settings and policies of those third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies and Similar Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Operate and secure the Site</li>
                <li>Remember your preferences</li>
                <li>Analyze how visitors use the Site</li>
                <li>Support advertising and marketing efforts</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can control or disable cookies through your browser settings. However, some features of the Site may
                not function properly if cookies are disabled.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Where required by law, we will ask for your consent before using certain cookies or similar
                technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for purposes including:
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Providing and maintaining the Services</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Operating, securing, and optimizing the Site; processing your requests and inquiries.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Communicating with you</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Sending newsletters and email updates you've subscribed to; responding to your questions, comments, or
                  feedback.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Improving the Services</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Understanding how users interact with the Site; developing new features and content based on
                  engagement trends.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Advertising and monetization</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Displaying relevant ads via third-party ad networks (such as Google AdSense); measuring ad
                  performance; preventing fraudulent activity.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Compliance and protection</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Enforcing our Terms of Service and other policies; protecting our rights, property, and safety and
                  that of our users or others; complying with applicable laws and regulations of the United States and
                  the State of Delaware.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-6">
                If you are located in the European Economic Area (EEA), the United Kingdom (UK), or similar
                jurisdictions, we rely on different legal bases for processing, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Performance of a contract</li>
                <li>Our legitimate interests (e.g., improving the Site, preventing fraud)</li>
                <li>Your consent (e.g., for certain marketing emails and non-essential cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Advertising, Analytics & Affiliate Links
              </h2>

              <h3 className="text-xl font-medium text-foreground mb-3">6.1 Advertising & Analytics</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may use third-party advertising and analytics partners, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Analytics</li>
                <li>Google AdSense or other ad networks</li>
                <li>Social media or marketing platforms</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These providers may use cookies, pixels, and similar technologies to collect or receive information from
                our Site and elsewhere on the internet and use that information to provide measurement services and show
                you targeted ads.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">6.2 Affiliate Links & Sponsored Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some of our content may include affiliate links or sponsored recommendations. This means if you click on
                a link or make a purchase, we may earn a commission at no extra cost to you.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We strive to clearly disclose sponsored posts and affiliate relationships in accordance with applicable
                guidelines (including Federal Trade Commission (FTC) guidelines in the United States).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information in the traditional sense of exchanging it for money.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">We may share information as follows:</p>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Within the Bane Digital Group</h4>
                <p className="text-muted-foreground leading-relaxed">
                  With Bane Digital, LLC and its affiliates for purposes consistent with this Privacy Policy.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">With Service Providers</h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  With third-party vendors who provide services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Website hosting and maintenance</li>
                  <li>Email delivery and newsletter management</li>
                  <li>Analytics and advertising</li>
                  <li>Security and anti-fraud tools</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  These providers may only use your information as necessary to provide services to us.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Business Transfers</h4>
                <p className="text-muted-foreground leading-relaxed">
                  In connection with a merger, acquisition, reorganization, sale of assets, or similar event involving
                  Bane Digital or {siteConfig.brand.name}. In such cases, your information may be transferred as part of that
                  transaction.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Legal and Safety</h4>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Where required by law, legal process, or government request, or when we believe disclosure is
                  necessary to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Comply with United States or Delaware law</li>
                  <li>Protect our rights, privacy, safety, or property and that of our users or others</li>
                  <li>Detect, prevent, or address fraud, security, or technical issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Services are operated from the United States. If you access the Site from outside the United States,
                your information may be transferred to, stored, and processed in the United States and other countries
                where our service providers are located.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Data protection laws in these countries may differ from those in your jurisdiction. Where required, we
                take steps to ensure an adequate level of protection for your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain personal information for as long as reasonably necessary to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide the Services</li>
                <li>Fulfill the purposes described in this Privacy Policy</li>
                <li>Comply with our legal obligations under United States and Delaware law</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                When we no longer need personal information, we will delete or anonymize it, or, if that is not possible
                (for example, because it is stored in backup archives), we will securely store it and isolate it from
                further processing until deletion is possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement reasonable technical and organizational measures designed to protect personal information
                against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the internet or method of electronic storage is completely
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Your Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have certain choices regarding your information:
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Email Communications</h4>
                <p className="text-muted-foreground leading-relaxed">
                  You can opt out of marketing emails by clicking the "unsubscribe" link in any such email or by
                  contacting us at {siteConfig.brand.privacyEmail}.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Cookies & Tracking</h4>
                <p className="text-muted-foreground leading-relaxed">
                  You can adjust your browser settings to block or delete cookies. Some analytics and advertising
                  partners may also offer their own opt-out mechanisms.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Do Not Track</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Some browsers offer a "Do Not Track" (DNT) feature. Our Site may not respond to DNT signals, as there
                  is no consistent industry standard for compliance.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have some or all of the following rights regarding your personal
                data:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access to the personal information we hold about you</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information (subject to legal and legitimate business exceptions)</li>
                <li>Restriction or objection to processing of your personal information</li>
                <li>Data portability in certain circumstances</li>
                <li>The right to withdraw consent where processing is based on consent</li>
                <li>The right to lodge a complaint with a supervisory authority (for EEA/UK users)</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-6 mb-4">
                Residents of certain U.S. states (e.g., California) may have additional rights, such as:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  The right to know what categories of personal information we collect and how we use and share it
                </li>
                <li>The right to request deletion of certain personal information</li>
                <li>The right to opt out of certain types of "sharing" or "selling" as defined in state law</li>
                <li>The right to non-discrimination for exercising privacy rights</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-6">
                To exercise any of these rights, please contact us at {siteConfig.brand.privacyEmail}. We may need to verify
                your identity before responding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Services are not directed to children under the age of 13, and we do not knowingly collect personal
                information from children under 13.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you believe a child under 13 has provided us with personal information, please contact us at
                {siteConfig.brand.privacyEmail}, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date
                at the top of this page. In some cases, we may provide additional notice (such as by posting a notice on
                the Site or sending an email).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your continued use of the Services after the updated Privacy Policy becomes effective indicates that you
                have read and understood the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Email:</strong> {siteConfig.brand.privacyEmail}
                </li>
                <li>
                  <strong className="text-foreground">Mailing Address:</strong>
                  <br />
                  Bane Digital, LLC / {siteConfig.brand.name}
                  <br />
                  651 N. Broad St., Suite 201
                  <br />
                  Middletown, DE 19709 USA
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <BlogFooter />
    </>
  )
}
