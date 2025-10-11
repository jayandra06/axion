import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this website, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to these terms, please do not use this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Product Information</h2>
            <p className="text-gray-700">
              We strive to provide accurate product descriptions and pricing. However, we do not
              warrant that product descriptions, pricing, or other content on this site is accurate,
              complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Orders and Payment</h2>
            <p className="text-gray-700">
              All orders are subject to acceptance and availability. We reserve the right to refuse
              any order. Payment must be received before products are shipped. We accept payments
              through Razorpay and other specified payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
            <p className="text-gray-700">
              Shipping costs and delivery times vary based on location and product availability. We
              are not responsible for delays caused by courier services or circumstances beyond our
              control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Returns and Refunds</h2>
            <p className="text-gray-700">
              Returns are accepted within 7 days of delivery for unopened products in original
              packaging. Refunds will be processed within 10-14 business days after receiving the
              returned product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Product Use</h2>
            <p className="text-gray-700">
              Our products are intended for use as animal feed supplements. Always follow dosage
              instructions and consult with a veterinarian if needed. Results may vary based on
              animal health and husbandry practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              Axion Scientifics shall not be liable for any indirect, incidental, special, or
              consequential damages arising out of the use or inability to use our products or
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including text, graphics, logos, and images, is the
              property of Axion Scientifics and protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by and construed in accordance with the laws of India,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms & Conditions, please contact us at
              legal@axionscientifics.com
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Last updated: October 2025</p>
        </div>
      </div>
    </div>
  );
}


