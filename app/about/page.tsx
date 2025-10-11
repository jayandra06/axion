import React from "react";
import { Users, Target, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">About Axion Scientifics</h1>
          <p className="text-xl max-w-3xl">
            Empowered by Science, Innovative in Solutions
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-4">
              Axion Scientifics pioneers natural, science-backed feed supplements dedicated to
              enhancing livestock growth, health, and immunity worldwide. From poultry and
              aquaculture to dairy and meat animals, our holistic herbal formulations nurture
              animals naturally and sustainably.
            </p>
            <p className="text-lg text-gray-700">
              Our products are designed to seamlessly integrate with modern farming practices,
              offering scalable solutions that cater to the unique challenges and nutritional
              demands of livestock globally.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ValueCard
              icon={<Target className="w-12 h-12" />}
              title="Innovation"
              description="Pioneering cutting-edge herbal formulations backed by scientific research."
            />
            <ValueCard
              icon={<Award className="w-12 h-12" />}
              title="Quality"
              description="Adhering to stringent international quality standards and regulatory compliance."
            />
            <ValueCard
              icon={<Globe className="w-12 h-12" />}
              title="Sustainability"
              description="Promoting eco-friendly, natural solutions for long-term agricultural health."
            />
            <ValueCard
              icon={<Users className="w-12 h-12" />}
              title="Partnership"
              description="Building lasting relationships with farmers and distributors worldwide."
            />
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <LeaderCard
              name="Sreenu Kambala"
              title="Managing Director"
              description="Seasoned business leader and Business Growth Strategist, Sreenu brings 25+ years in corporate strategy and entrepreneurial success driving Axion's growth and market expansion."
            />
            <LeaderCard
              name="Abdul Mazeed Mohammad"
              title="CEO"
              description="A global supply chain expert with over 22 years' experience, Abdul steers Axion Scientifics with visionary leadership, blending innovation with operational excellence worldwide."
            />
            <LeaderCard
              name="Rajendra"
              title="R&D Director"
              description="With 15+ years pioneering product innovations in human and veterinary sectors, Rajendra leads our scientific product development with deep domain expertise."
            />
            <LeaderCard
              name="Rihana Shaik"
              title="Head of Quality Assurance & Regulatory Affairs"
              description="Bringing 11 years of expertise, Rihana ensures Axion's products adhere to stringent quality standards and international regulatory compliance."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="Are Axion Scientifics products truly natural and safe for all livestock?"
              answer="Yes, our products are formulated using 100% natural, plant-based bioactive ingredients scientifically selected for safety and efficacy. They contain no synthetic chemicals, antibiotics, or growth hormones."
            />
            <FAQItem
              question="Can these supplements be used for all types of livestock and aquaculture species?"
              answer="Absolutely. Our product range includes specialized formulations tailored for poultry, fish and shrimp, dairy animals, meat animals such as cattle, buffaloes, sheep, goats, pigs, and equines."
            />
            <FAQItem
              question="How soon can I expect to see results after using Axion Scientifics supplements?"
              answer="Typically, farmers observe improved immunity and gradual growth enhancement within a few weeks. Optimal results depend on consistent use alongside balanced nutrition and good husbandry practices."
            />
            <FAQItem
              question="Are your products compliant with international regulations for export?"
              answer="Yes. Our manufacturing adheres to global quality standards, and we ensure compliance with international regulatory frameworks to facilitate export and use in varied markets."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function LeaderCard({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Users className="w-12 h-12 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
      <p className="text-primary-600 font-medium text-center mb-4">{title}</p>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-bold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}


