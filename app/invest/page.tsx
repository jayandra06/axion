import React from "react";
import { TrendingUp, Globe, Users, Award, Target, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Invest in the Future of Livestock Health</h1>
            <p className="text-xl mb-8">
              Join Axion Scientifics in revolutionizing animal nutrition with natural, science-backed
              solutions. Be part of a growing industry making a global impact.
            </p>
            <a href="mailto:invest@axionscientifics.com">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                <Mail className="w-5 h-5 mr-2" />
                Contact Investment Team
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Why Invest in Axion Scientifics?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Growing Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The global animal nutrition market is projected to reach $250+ billion by 2030,
                  with natural supplements showing the fastest growth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our formulations are backed by extensive research and field trials across
                  thousands of farms, demonstrating measurable results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Global Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Currently serving India with plans to expand to Southeast Asia, Africa, and
                  Latin America - high-growth livestock markets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Expert Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Led by a team with 70+ combined years of experience in supply chain,
                  R&D, and regulatory compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Sustainable Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Replacing antibiotics and synthetic growth promoters with natural alternatives,
                  contributing to healthier food chains worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-12 h-12 text-primary-600 mb-4" />
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All products meet international quality standards and are designed for
                  multi-market regulatory approval.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Market Opportunity</h2>

          <div className="space-y-6">
            <div className="p-6 bg-primary-50 rounded-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                $250B+ Global Market by 2030
              </h3>
              <p className="text-primary-800">
                The animal nutrition and health market continues to grow at 6-8% CAGR, driven by
                increasing protein demand and focus on animal welfare.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Natural Supplements: Fastest Growing Segment
              </h3>
              <p className="text-green-800">
                Consumer demand for antibiotic-free and natural products is driving a shift toward
                herbal and botanical supplements across all livestock categories.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Emerging Markets Leading Growth
              </h3>
              <p className="text-blue-800">
                India, Southeast Asia, and Africa represent high-growth opportunities with
                expanding livestock industries and increasing quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Investment Opportunities</h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Equity Partnership</h3>
                <p className="text-gray-600">
                  Join as a strategic equity partner in our expansion plans across new markets
                  and product lines.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Debt Financing</h3>
                <p className="text-gray-600">
                  Support our working capital and infrastructure expansion with competitive
                  debt instruments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Distribution Partnership</h3>
                <p className="text-gray-600">
                  Become a regional distribution partner and share in the growth of your territory.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our investment team to learn more about opportunities, financial performance,
            and growth projections.
          </p>
          <a href="mailto:invest@axionscientifics.com">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
              <Mail className="w-5 h-5 mr-2" />
              invest@axionscientifics.com
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}


