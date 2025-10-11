import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Empowered by Science, Innovative in Solutions
            </h1>
            <p className="text-xl mb-8">
              Axion Scientifics pioneers natural, science-backed feed supplements dedicated to
              enhancing livestock growth, health, and immunity worldwide. From poultry and
              aquaculture to dairy and meat animals, our holistic herbal formulations nurture
              animals naturally and sustainably.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                  Explore Products <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Our Product Portfolio</h2>

          {/* National Products */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary-600 mb-6">
              National Products (India Market)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                title="Aqua Raksha"
                description="Herbal formulation optimized for aquaculture species like fish and shrimp. Promotes water quality adaptation, disease resistance, and accelerated growth."
                icon="🐟"
              />
              <ProductCard
                title="Poultry Raksha"
                description="Potent natural blend enhancing immunity, feed conversion, and weight gain in poultry farms."
                icon="🐔"
              />
              <ProductCard
                title="Pashu Raksha"
                description="Specialized supplements supporting health, lactation, and immunity in milking and meat animals (cows, buffaloes, sheep, goats)."
                icon="🐄"
              />
            </div>
          </div>

          {/* International Products */}
          <div>
            <h3 className="text-2xl font-bold text-primary-600 mb-6">
              International Products (Global Market Aspirations)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                title="HerbiGuard Aqua"
                description="Advanced aquafeed supplement for disease prevention and growth promotion in aquaculture globally."
                icon="🌊"
              />
              <ProductCard
                title="HerbiGuard Plume"
                description="Targeted for robust poultry health and growth with enhanced disease resistance."
                icon="🦅"
              />
              <ProductCard
                title="HerbiGuard Lacto"
                description="Enhances milk yield and quality in dairy animals through natural immunomodulation."
                icon="🥛"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="primary" size="lg">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">The Herbal Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<CheckCircle className="w-8 h-8 text-primary-600" />}
              title="Natural Growth Promotion"
              description="Enhances metabolism and nutrient assimilation for consistent weight gain."
            />
            <BenefitCard
              icon={<Award className="w-8 h-8 text-primary-600" />}
              title="Immune System Boost"
              description="Strengthens natural defenses, reducing disease susceptibility."
            />
            <BenefitCard
              icon={<TrendingUp className="w-8 h-8 text-primary-600" />}
              title="Digestive Health"
              description="Improves feed utilization and gut health through enzyme activation."
            />
            <BenefitCard
              icon={<CheckCircle className="w-8 h-8 text-primary-600" />}
              title="Safe & Sustainable"
              description="Antibiotic-free, suitable for long-term use without residues."
            />
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard
              name="Sreenu Kambala"
              title="Managing Director"
              description="25+ years in corporate strategy and entrepreneurial success driving Axion's growth."
            />
            <TeamCard
              name="Abdul Mazeed Mohammad"
              title="CEO"
              description="22 years' experience in global supply chain, steering Axion with visionary leadership."
            />
            <TeamCard
              name="Rajendra"
              title="R&D Director"
              description="15+ years pioneering product innovations in human and veterinary sectors."
            />
            <TeamCard
              name="Rihana Shaik"
              title="Head of QA & Regulatory Affairs"
              description="11 years ensuring products adhere to international quality standards."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Livestock Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers worldwide who trust Axion Scientifics for natural,
            science-backed solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({
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
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function TeamCard({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Users className="w-10 h-10 text-primary-600" />
      </div>
      <h4 className="text-lg font-bold mb-1">{name}</h4>
      <p className="text-primary-600 font-medium mb-3 text-sm">{title}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}


