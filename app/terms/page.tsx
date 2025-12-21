import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { siteConfig } from "@/lib/config"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.brand.name}`,
  description: `Read the terms and conditions for using ${siteConfig.brand.name}'s website and services.`,
  openGraph: {
    title: `Terms of Service | ${siteConfig.brand.name}`,
    description: `Read the terms and conditions for using ${siteConfig.brand.name}'s website and services.`,
    type: "website",
  },
}

export default function TermsPage() {
  // Extract domain from URL
  const domain = siteConfig.brand.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  
  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <FileText className="size-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          </div>

          <div className="prose prose-green max-w-none space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">Last Updated: January 15, 2025</p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your access to and use of the website {siteConfig.brand.url}
                and any content, features, or services offered by {siteConfig.brand.name} (collectively, the "Services").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {siteConfig.brand.name} is a brand operated by Bane Digital, LLC ("Bane Digital," "we," "us," or "our"), a
                Delaware limited liability company with its principal business address at:
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 pl-4">
                651 N. Broad St., Suite 201
                <br />
                Middletown, DE 19709 USA
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy. If you
                do not agree to these Terms, you must not use the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using the Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are at least 18 years of age (or the age of majority in your jurisdiction); or</li>
                <li>
                  If you are under 18, you are using the Services with the consent and supervision of a parent or legal
                  guardian who agrees to be bound by these Terms on your behalf.
                </li>
                <li>
                  If you are using the Services on behalf of a business or other entity, you represent that you have
                  authority to bind that entity to these Terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Changes to the Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update these Terms from time to time. When we do, we will revise the "Last Updated" date above.
                In some cases, we may provide additional notice (for example, by posting a prominent notice on the Site
                or sending an email).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your continued use of the Services after the updated Terms become effective constitutes your acceptance
                of the changes. If you do not agree with the updated Terms, you must stop using the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and
                disclose your information. By using the Services, you consent to our data practices as described in the
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Content and Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1 Our Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unless otherwise indicated, all content on the Services, including text, images, graphics, logos,
                videos, design, layout, and other materials ("Site Content") is owned or licensed by Bane Digital and/or
                its licensors and is protected by copyright, trademark, and other intellectual property laws of the
                United States and the State of Delaware.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the
                Services and Site Content for your personal, non-commercial use only, subject to these Terms.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Copy, reproduce, modify, distribute, publicly display, or create derivative works based on the Site
                  Content without our prior written permission, except as permitted by law (e.g., fair use)
                </li>
                <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.2 User-Generated Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If the Services allow you to post comments, reviews, or other content ("User Content"):
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>You retain any ownership rights you have in your User Content.</li>
                <li>
                  You grant Bane Digital and its affiliates a worldwide, non-exclusive, royalty-free, perpetual,
                  irrevocable, sublicensable license to host, store, use, reproduce, modify, adapt, publish, translate,
                  create derivative works from, distribute, and display such User Content in connection with operating,
                  promoting, and improving the Services.
                </li>
                <li>
                  You are solely responsible for your User Content and for ensuring it complies with these Terms and
                  applicable laws.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right—but have no obligation—to review, monitor, remove, or edit User Content at our sole
                discretion.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.3 Trademarks</h3>
              <p className="text-muted-foreground leading-relaxed">
                {siteConfig.brand.name}, Bane Digital, and any related logos are trademarks or service marks of Bane Digital,
                LLC, a Delaware limited liability company. Other names, logos, and marks are the property of their
                respective owners. You may not use any of these marks without our prior written consent or the consent
                of the relevant owner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use the Services:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>For any unlawful, harmful, fraudulent, or malicious purpose</li>
                <li>
                  To violate any applicable laws or regulations (including those of the United States and the State of
                  Delaware) or third-party rights
                </li>
                <li>
                  To post or transmit any content that:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>is illegal, defamatory, obscene, hateful, harassing, or otherwise objectionable;</li>
                    <li>infringes upon any intellectual property, privacy, or other rights; or</li>
                    <li>constitutes spam, junk mail, or other unsolicited or unauthorized communications</li>
                  </ul>
                </li>
                <li>To attempt to gain unauthorized access to any systems, networks, or user accounts</li>
                <li>To introduce viruses, malware, or other harmful code</li>
                <li>
                  To scrape, crawl, or use any automated means to access the Services (other than search engine
                  indexing) without our prior written permission
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We may suspend or terminate your access to the Services if we reasonably believe you have violated these
                Terms or pose a risk to the Services or other users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. No Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The content on the Services is provided for informational and educational purposes only. It may cover
                topics such as health, wellness, travel, finance, or other subjects, depending on the focus of {siteConfig.brand.name}.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nothing on the Services constitutes professional advice (including medical, legal, financial, or other
                professional advice). You should not rely on content on the Site as a substitute for professional
                advice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Always consult an appropriate qualified professional for questions relating to your health, finances,
                legal matters, or other specialized topics. Your reliance on any information provided by the Services is
                solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Third-Party Links, Ads & Affiliate Relationships
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Services may contain links to third-party websites or services that are not owned or controlled by
                Bane Digital.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  We are not responsible for the content, policies, or practices of any third-party sites or services.
                </li>
                <li>Your use of third-party sites is subject to their own terms and privacy policies.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">The Services may also display:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Third-party advertisements (e.g., through Google AdSense or other networks)</li>
                <li>Affiliate links to products or services, where we earn a commission if you make a purchase</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not control third-party products or services and do not guarantee their quality or suitability.
                Your dealings with third parties are solely between you and the third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the fullest extent permitted by applicable law (including the laws of the United States and the State
                of Delaware), the Services and all content are provided on an "AS IS" and "AS AVAILABLE" basis, without
                warranties of any kind, whether express or implied.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">We do not warrant that:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>The Services will be uninterrupted, secure, or error-free</li>
                <li>Any defects will be corrected</li>
                <li>
                  The Services or the servers that make them available are free of viruses or other harmful components
                </li>
                <li>The information on the Services is accurate, complete, or current</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but
                not limited to implied warranties of merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the fullest extent permitted by applicable law, in no event shall Bane Digital, LLC, {siteConfig.brand.name},
                or their respective officers, directors, employees, contractors, agents, or affiliates be liable for
                any:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Indirect, incidental, special, consequential, or punitive damages; or</li>
                <li>Loss of profits, revenue, data, or goodwill,</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">arising out of or in connection with:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Your access to or use of (or inability to access or use) the Services</li>
                <li>Any conduct or content of any third party on the Services</li>
                <li>Any content obtained from the Services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Even if we have been advised of the possibility of such damages.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If we are found liable to you for any damage or loss arising from or in connection with your use of the
                Services, our total liability shall not exceed, to the fullest extent permitted by law, the greater of:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  The amount you paid (if any) for access to the Services in the twelve (12) months preceding the event
                  giving rise to the claim; or
                </li>
                <li>USD $100.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Some jurisdictions do not allow certain limitations of liability, so some of the above may not apply to
                you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Bane Digital, LLC, {siteConfig.brand.name}, and their
                respective officers, directors, employees, agents, and affiliates from and against any and all claims,
                liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of
                or related to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your access to or use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your User Content</li>
                <li>Your violation of any law or the rights of any third party</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right, in our sole discretion and without notice, to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Suspend or terminate your access to the Services</li>
                <li>Remove or refuse to display any content</li>
                <li>Take any other actions we deem appropriate</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                if we reasonably believe you have violated these Terms or are otherwise engaging in behavior that may
                harm the Services or other users. Upon termination, all rights and licenses granted to you by these
                Terms will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms and your use of the Services are governed by the laws of the State of Delaware, United
                States, without regard to its conflict of law principles.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You agree that any dispute arising out of or in connection with these Terms or the Services shall be
                brought exclusively in the state or federal courts located in New Castle County, Delaware, United
                States, and you consent to the personal jurisdiction and venue of such courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Copyright Complaints (DMCA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that content on the Services infringes your copyright, you may send a notice to our
                designated agent at {siteConfig.brand.legalEmail} with the following information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>A description of where the allegedly infringing content is located on the Services</li>
                <li>Your name, address, telephone number, and email address</li>
                <li>
                  A statement that you have a good faith belief that the use is not authorized by the copyright owner,
                  its agent, or the law
                </li>
                <li>
                  A statement, under penalty of perjury, that the information in your notice is accurate and that you
                  are the copyright owner or authorized to act on the copyright owner's behalf
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Email:</strong> {siteConfig.brand.legalEmail}
                </li>
                <li>
                  <strong className="text-foreground">Address:</strong> Bane Digital, LLC, 651 N. Broad St., Suite 201,
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
