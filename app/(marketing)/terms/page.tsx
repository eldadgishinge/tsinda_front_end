'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Target, Users, FileText, AlertTriangle, CheckCircle, ArrowRight, Star, Zap, Heart } from 'lucide-react'

export default function TermsPage() {
  return (
    <article className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
          <section className="flex items-center space-x-4 lg:space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hxaByNvU8TKzz1s5pL1JrvMKDa9Bvn.png"
                alt="Tsindacyane Logo"
                width={150}
                height={30}
                className="h-6 sm:h-7 lg:h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </section>
          <section className="flex items-center space-x-4">
            <Link href="/login" className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
              Log in
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1045A1] hover:bg-[#0D3A8B] text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-2.5 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                Create an account
              </Button>
            </Link>
          </section>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <section className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <figure className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full mb-6">
              <Shield className="h-8 w-8 text-white" />
            </figure>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transparent practices that prioritize your privacy and learning experience
            </p>
            <nav className="flex items-center justify-center gap-2 mt-6">
              <span className="w-2 h-2 bg-[#1045A1] rounded-full"></span>
              <span className="w-2 h-2 bg-[#1045A1] rounded-full opacity-60"></span>
              <span className="w-2 h-2 bg-[#1045A1] rounded-full opacity-30"></span>
            </nav>
          </header>

          <section className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-lg">
            <header className="bg-gradient-to-r from-[#1045A1] to-[#0D3A8B] p-6 lg:p-8">
              <section className="flex items-center gap-4">
                <figure className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <Star className="h-6 w-6 text-white" />
                </figure>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Section 3.1.2 Ethical Considerations</h2>
              </section>
            </header>
            <section className="p-6 lg:p-8">
              <article className="space-y-8">
                <article className="relative">
                  <aside className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#1045A1] to-[#0D3A8B] rounded-full"></aside>
                  <section className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#1045A1] rounded-full"></span>
                      Informed Consent and Voluntary Participation
                    </h3>
                    <section className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        All participants take part voluntarily with clear descriptions of project aims and participation requirements. Users are informed that feedback and usage information will be gathered for research purposes, with informed consent provided through signed documents or clear online interface agreements.
                      </p>
                      <p>
                        Participants can withdraw from the study at any time or refuse to answer questions without penalty or loss of access to the platform, with their rights assured and participation founded on comprehension of study goals and procedures.
                      </p>
                    </section>
                  </section>
                </article>

                <article className="relative">
                  <aside className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#1045A1] to-[#0D3A8B] rounded-full"></aside>
                  <section className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#1045A1] rounded-full"></span>
                      Privacy and Data Protection
                    </h3>
                    <section className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        We prioritize personal data protection and privacy. No personally identifiable sensitive information other than required account creation information is gathered. Analysis data such as quiz outcomes, survey responses, and usage logs are anonymized or aggregated to avoid identification of individual participants in reports.
                      </p>
                      <p>
                        Results are presented as percentages and trends instead of linking responses to individual users. All data is kept securely in password-protected files or databases with access restricted to the research team.
                      </p>
                    </section>
                  </section>
                </article>

                <article className="relative">
                  <aside className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#1045A1] to-[#0D3A8B] rounded-full"></aside>
                  <section className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#1045A1] rounded-full"></span>
                      Consideration of Vulnerable Groups
                    </h3>
                    <section className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        We target young adult learners between 18-35 pursuing driving theory education. No minors are knowingly engaged in pilot deployment or surveys, as Rwanda's age requirement for provisional driver's licenses is 18.
                      </p>
                      <p>
                        The study is sensitive to other forms of vulnerability, engaging participants from low-income or rural backgrounds respectfully and carefully avoiding exploitation or undue influence. The platform and surveys are provided free of charge without substantial incentives that could force participation.
                      </p>
                    </section>
                  </section>
                </article>

                <article className="relative">
                  <aside className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#1045A1] to-[#0D3A8B] rounded-full"></aside>
                  <section className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 bg-[#1045A1] rounded-full"></span>
                      Compliance with Institutional and National Ethics Standards
                    </h3>
                    <section className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        This research is in line with African Leadership University ethics requirements and broad research ethics guidelines in Rwanda. The proposal, research design, and plans for data collection were examined and cleared for ethical considerations by faculty supervisors.
                      </p>
                      <p>
                        All processes adhere to concepts of honesty, integrity, and respect for persons as set forth in documents such as the Belmont Report and in-country research laws. This involves maintaining beneficence principles, justice, and respect for persons.
                      </p>
                    </section>
                  </section>
                </article>
              </article>
            </section>
          </section>

          <section className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 rounded-lg p-6 lg:p-8">
            <header className="text-center mb-8">
              <figure className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full mb-4">
                <Shield className="h-6 w-6 text-white" />
              </figure>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Our Ethical Principles</h2>
              <p className="text-gray-600">The foundation of our commitment to your privacy and trust</p>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100">
                <section className="flex items-start gap-4">
                  <figure className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Data Protection</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your personal information is encrypted and stored securely using industry-standard protocols. We never share your data with third parties without explicit consent.
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100">
                <section className="flex items-start gap-4">
                  <figure className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Transparency</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We believe in complete transparency about how we collect, use, and protect your data. You have full control over your information.
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100">
                <section className="flex items-start gap-4">
                  <figure className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Purpose-Driven</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We only collect data that directly improves your learning experience. Every piece of information serves a clear educational purpose.
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100">
                <section className="flex items-start gap-4">
                  <figure className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">User Consent</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You have the right to know what data we collect and can withdraw consent at any time. Your choices are always respected.
                    </p>
                  </section>
                </section>
              </article>
            </section>
          </section>

          <section className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 rounded-lg p-6 lg:p-8">
            <header className="text-center mb-8">
              <figure className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
                <FileText className="h-6 w-6 text-white" />
              </figure>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">How We Manage Your Data</h2>
              <p className="text-gray-600">Transparent practices for handling your information</p>
            </header>
            
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <article className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <header className="flex items-center gap-3 mb-4">
                  <figure className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </figure>
                  <h3 className="text-xl font-semibold text-gray-900">What We Collect</h3>
                </header>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Account information (name, email, password)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Learning progress and quiz results</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Course completion data</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Device information for optimal experience</span>
                  </li>
                </ul>
              </article>

              <article className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <header className="flex items-center gap-3 mb-4">
                  <figure className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </figure>
                  <h3 className="text-xl font-semibold text-gray-900">How We Use It</h3>
                </header>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Personalize your learning experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Track your progress and achievements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Improve our educational content</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Provide customer support</span>
                  </li>
                </ul>
              </article>

              <article className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <header className="flex items-center gap-3 mb-4">
                  <figure className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </figure>
                  <h3 className="text-xl font-semibold text-gray-900">How We Protect It</h3>
                </header>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Secure cloud storage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Limited access protocols</span>
                  </li>
                </ul>
              </article>
            </section>
          </section>

          <section className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/30 rounded-lg p-6 lg:p-8">
            <header className="text-center mb-8">
              <figure className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mb-4">
                <Heart className="h-6 w-6 text-white" />
              </figure>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Your Privacy Rights</h2>
              <p className="text-gray-600">Your fundamental rights to control your personal data</p>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Right to Access</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Request a copy of all personal data we hold about you
                </p>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Right to Rectification</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Correct any inaccurate or incomplete information
                </p>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Right to Erasure</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Request deletion of your personal data
                </p>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Right to Portability</h3>
                </header>
                <p className="text-gray-600 leading-relaxed">
                  Receive your data in a structured, machine-readable format
                </p>
              </article>
            </section>
          </section>

          <section className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 rounded-lg p-6 lg:p-8">
            <header className="text-center mb-8">
              <figure className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4">
                <Zap className="h-6 w-6 text-white" />
              </figure>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Safety & Security Measures</h2>
              <p className="text-gray-600">Advanced protection for your data and privacy</p>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100 bg-gradient-to-br from-blue-50 to-blue-100">
                <section className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 text-lg">SSL Encryption</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All data transmission is protected with 256-bit SSL encryption
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100 bg-gradient-to-br from-green-50 to-green-100">
                <section className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 text-lg">Secure Authentication</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Multi-factor authentication and strong password requirements
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100 bg-gradient-to-br from-purple-50 to-purple-100">
                <section className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 text-lg">Regular Backups</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Automated daily backups with disaster recovery protocols
                    </p>
                  </section>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 border border-gray-100 bg-gradient-to-br from-orange-50 to-orange-100">
                <section className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </figure>
                  <section>
                    <h3 className="font-semibold text-gray-900 text-lg">Access Controls</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Strict role-based access controls for all team members
                    </p>
                  </section>
                </section>
              </article>
            </section>
          </section>

          <section className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 lg:p-8">
            <header className="text-center mb-8">
              <figure className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1045A1] to-[#0D3A8B] rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </figure>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Our dedicated privacy team is here to help you understand your rights and our practices.
              </p>
            </header>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Privacy Officer</h3>
                </header>
                <section className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Email: privacy@tsinda.com
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Response time: Within 24 hours
                  </p>
                </section>
              </article>
              <article className="group hover:bg-white hover:shadow-lg rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <header className="flex items-center gap-4 mb-4">
                  <figure className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-6 w-6 text-white" />
                  </figure>
                  <h3 className="font-semibold text-gray-900 text-lg">Data Protection</h3>
                </header>
                <section className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Email: dataprotection@tsinda.com
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    For urgent security concerns
                  </p>
                </section>
              </article>
            </section>
          </section>

          <footer className="text-center py-8">
            <section className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-6 py-3">
              <span className="w-2 h-2 bg-[#1045A1] rounded-full animate-pulse"></span>
              <p className="text-gray-600 font-medium">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </footer>
        </section>
      </main>

      <footer className="border-t py-6 lg:py-8">
        <section className="container mx-auto px-4 sm:px-6">
          <section className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <section className="text-xs lg:text-sm text-gray-600">
              © {new Date().getFullYear()} Tsinda. All rights reserved.
            </section>
            <nav className="flex flex-wrap gap-4 lg:gap-6 justify-center sm:justify-end">
              <Link
                href="/terms"
                className="text-xs lg:text-sm text-[#1045A1] hover:text-[#0D3A8B] font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
              >
                Cookie Policy
              </Link>
            </nav>
          </section>
        </section>
      </footer>
    </article>
  )
} 