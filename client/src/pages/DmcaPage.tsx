import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function DmcaPage() {
  useSEO({
    title: "DMCA Policy - PDF HUB 24",
    description: "DMCA policy for PDF HUB 24. Learn how to report copyright infringement and our procedures for handling DMCA takedown requests.",
    keywords: "dmca policy, copyright, takedown request, pdf hub 24"
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-dmca-back">
            <ChevronLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6">DMCA Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: December 22, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Digital Millennium Copyright Act Notice</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDF HUB 24 respects the intellectual property rights of others and expects users of our 
              service to do the same. We will respond to notices of alleged copyright infringement 
              that comply with the Digital Millennium Copyright Act (DMCA).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">No File Storage Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PDF HUB 24 is a file processing tool that does not store user-uploaded files. All files are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Processed in temporary memory only</li>
              <li>Automatically deleted immediately after processing</li>
              <li>Never stored permanently on our servers</li>
              <li>Not indexed, searchable, or publicly accessible</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Because we do not store files, we cannot host infringing content. However, if you believe 
              your copyrighted work is being misused through our service, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Filing a DMCA Complaint</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you believe that content available through our service infringes your copyright, 
              please send a written notification containing the following information:
            </p>
            <ul className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>A physical or electronic signature of the copyright owner or authorized agent</li>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material that is claimed to be infringing, with sufficient 
                  detail for us to locate it</li>
              <li>Your contact information (address, telephone number, and email address)</li>
              <li>A statement that you have a good faith belief that use of the material is not 
                  authorized by the copyright owner</li>
              <li>A statement, under penalty of perjury, that the information in the notification 
                  is accurate and that you are the copyright owner or authorized to act on their behalf</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact for DMCA Notices</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Please send DMCA notices to:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p className="font-medium">PDF HUB 24 DMCA Agent</p>
              <p>Email: dmca@pdfhub24.com</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Counter-Notification</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you believe that your content was removed or disabled by mistake or misidentification, 
              you may submit a counter-notification to our DMCA Agent. The counter-notification must include:
            </p>
            <ul className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
              <li>Your physical or electronic signature</li>
              <li>Identification of the material that was removed or disabled</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material 
                  was removed by mistake or misidentification</li>
              <li>Your name, address, telephone number, and a statement consenting to jurisdiction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Repeat Infringers</h2>
            <p className="text-muted-foreground leading-relaxed">
              In appropriate circumstances, PDF HUB 24 will disable or terminate access for users 
              who are repeat infringers. Since our service does not require user accounts and does 
              not store files, enforcement is limited to IP-based restrictions where applicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users of PDF HUB 24 are solely responsible for ensuring they have the right to process 
              any files they upload. By using our service, you represent that you own or have 
              permission to use and process the uploaded content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this DMCA Policy from time to time. We will notify users of any changes 
              by posting the new policy on this page with an updated revision date.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
