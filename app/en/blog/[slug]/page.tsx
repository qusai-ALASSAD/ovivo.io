import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

const postData: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  intro: string;
  sections: { heading: string; body: string; list?: string[] }[];
}> = {
  'restaurant-automation-guide': {
    title: 'How Restaurants Are Using AI Automation to Fill Tables in 2025',
    category: 'Automation',
    date: 'Jan 20, 2025',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Forward-thinking restaurant owners are using AI chatbots and automation to increase reservations by up to 40% — without hiring additional staff. This guide breaks down exactly how it works.',
    sections: [
      {
        heading: 'The Problem: Missed Reservations',
        body: 'Many restaurants lose potential guests because inquiries outside opening hours or during peak times go unanswered. Every unanswered message is a lost table.',
      },
      {
        heading: 'The Solution: AI-Powered Reservation Flows',
        body: 'An AI chatbot can accept reservation requests around the clock, show available times, and instantly confirm bookings — via website, WhatsApp, and Instagram.',
        list: [
          'Instant response to every inquiry — even at night',
          'Automatic confirmation and reminder SMS',
          'Direct integration with your existing calendar',
          'Upselling of special menus and events',
        ],
      },
      {
        heading: 'Real-World Example: Bistro on the Market',
        body: 'A 60-seat bistro implemented an AI reservation bot on their website and WhatsApp. Within 6 weeks, weekend occupancy rose from 72% to 94%. No new hires, no menu changes.',
      },
      {
        heading: 'How to Get Started',
        body: 'Getting started is simpler than you think. A basic system can be live within 7 days. The key is choosing the right partner who will train your chatbot on your specific menu, hours, and processes.',
      },
    ],
  },
  'whatsapp-business-automation': {
    title: 'WhatsApp Business Automation: The Complete Guide for Service Companies',
    category: 'WhatsApp',
    date: 'Jan 15, 2025',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'WhatsApp is the most-used messenger app in Europe. Service businesses that use automated sequences close significantly more deals than their competition.',
    sections: [
      {
        heading: 'Why WhatsApp Automation Works',
        body: 'WhatsApp messages are opened within an average of 3 minutes — emails take hours. If you respond within that window (automatically), you win the job.',
      },
      {
        heading: 'The 3 Most Important Automation Flows',
        body: 'Three flows cover 80% of communication for service businesses:',
        list: [
          'Welcome Flow: Instant reply to first contact with info and a CTA',
          'Follow-up Flow: Automatic follow-up after 24h, 48h, and 7 days without a reply',
          'Review Flow: Automatic review request after a completed job',
        ],
      },
      {
        heading: 'Technical Setup',
        body: 'You need a WhatsApp Business API account and a CRM or automation tool like GoHighLevel or Make.com. Setup takes 3–7 days depending on complexity.',
      },
      {
        heading: 'Compliance & Privacy',
        body: 'Important: Only customers who have actively made contact may be reached via WhatsApp. Make sure opt-in and opt-out are clearly communicated.',
      },
    ],
  },
  'ai-chatbot-for-local-business': {
    title: '5 Ways an AI Chatbot Can Transform Your Local Business This Year',
    category: 'AI Chatbot',
    date: 'Jan 10, 2025',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Local businesses today compete with big brands for the same customers. A well-trained AI chatbot completely levels the playing field.',
    sections: [
      {
        heading: '1. FAQ Answering — 24/7',
        body: 'Opening hours, prices, parking, directions — customers ask these questions every day. A chatbot answers instantly, with zero staff effort.',
      },
      {
        heading: '2. Appointment Booking In-Chat',
        body: 'Customers can book an appointment directly in the chat. The chatbot checks availability, confirms the booking, and sends reminders — fully automatically.',
      },
      {
        heading: '3. Lead Qualification',
        body: 'Before a prospect reaches you, the chatbot qualifies them: budget, timeline, exact requirements. You only speak with serious prospects.',
        list: [
          'What is your main concern?',
          'When are you looking to start?',
          'Do you already have a budget in mind?',
        ],
      },
      {
        heading: '4. After-Sales Communication',
        body: 'After a purchase or visit, the chatbot can automatically ask for feedback, request a review, and recommend relevant follow-up products.',
      },
      {
        heading: '5. Multilingual Support',
        body: 'For businesses in urban areas: an AI chatbot can communicate in multiple languages, reaching a wider audience without extra effort.',
      },
    ],
  },
  'crm-for-small-business': {
    title: 'CRM for Small Business: Which System Is Right for You in 2025?',
    category: 'CRM',
    date: 'Jan 5, 2025',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'A CRM system is the foundation for scaled growth. But which system is right for your business? Here is an honest comparison of the most popular options.',
    sections: [
      {
        heading: 'What a CRM Actually Needs to Do',
        body: 'For small businesses, three things matter most: ease of use, solid automation features, and integration with existing tools like email and WhatsApp.',
      },
      {
        heading: 'GoHighLevel — Best All-in-One for Service Businesses',
        body: 'GoHighLevel combines CRM, email marketing, SMS, funnels, calendar, and automations in one system. Ideal for agencies, coaches, and local service businesses.',
        list: [
          'Full marketing automation stack',
          'Pipeline management with drag & drop',
          'Native WhatsApp & SMS integration',
          'Starting at ~$97/month',
        ],
      },
      {
        heading: 'HubSpot — Best for Growing Teams',
        body: 'HubSpot has a free entry tier and scales up to enterprise. Particularly strong for email marketing and sales pipeline tracking.',
      },
      {
        heading: 'Pipedrive — Best for Sales-Focused Teams',
        body: 'Pipedrive is especially intuitive and oriented around the sales process. Ideal for businesses with active outbound sales.',
      },
      {
        heading: 'Our Recommendation',
        body: 'For most service businesses under €5M in revenue, we recommend GoHighLevel. It offers the most features for the price and can be fully customized to your processes.',
      },
    ],
  },
  'google-ads-for-restaurants': {
    title: 'Google Ads for Restaurants: How to Get More Bookings Without Wasting Budget',
    category: 'Ads',
    date: 'Dec 20, 2024',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/267401/pexels-photo-267401.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Many restaurants burn through their budget with inefficient Google Ads campaigns. This guide shows how to do it right — even on a small budget.',
    sections: [
      {
        heading: 'The Most Common Mistake: Too Broad an Audience',
        body: 'Restaurants run ads for overly general keywords and pay for clicks from areas where people will never eat there. Local targeting is essential.',
      },
      {
        heading: 'The Right Keywords for Restaurants',
        body: 'Focus on location-based keywords and specific search queries:',
        list: [
          '"Restaurant [city name]" and "[cuisine] restaurant in [city name]"',
          '"Book a table [city name]"',
          '"Restaurant for birthday [city name]"',
          '"Lunch [neighborhood]"',
        ],
      },
      {
        heading: 'Allocate Your Budget Correctly',
        body: 'Even with €10–15 per day, you can achieve measurable results if you target the right keywords and times. Weekends and holidays deserve more budget.',
      },
      {
        heading: 'Conversion Tracking Is Non-Negotiable',
        body: 'Without tracking, you have no idea which ads are driving reservations. Set up conversion goals: phone calls, form submissions, booking confirmations.',
      },
      {
        heading: 'Landing Page Instead of Homepage',
        body: 'Never send ad clicks to your homepage. Create a dedicated booking page with a clear CTA and everything guests need to make a reservation.',
      },
    ],
  },
  'branding-for-service-businesses': {
    title: 'Why Your Brand Is Losing You Customers — And How to Fix It',
    category: 'Branding',
    date: 'Dec 15, 2024',
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1200',
    intro: 'Potential customers make a judgment about your brand in 0.05 seconds. An unprofessional appearance costs you jobs every single day — often without you even realizing it.',
    sections: [
      {
        heading: 'What Branding Actually Means',
        body: 'Branding is not just a logo. It is the sum total of all visual and communicative signals your business sends — from the logo to the website to the way you respond to inquiries.',
      },
      {
        heading: 'The 4 Most Common Branding Mistakes',
        body: 'These mistakes appear in almost every small business:',
        list: [
          'Inconsistent colors and fonts across different channels',
          'A DIY logo that does not look professional',
          'No consistent tone across texts and social media posts',
          'Missing or outdated profile pictures on social media',
        ],
      },
      {
        heading: 'How Premium Branding Justifies Higher Prices',
        body: 'Businesses with professional branding can charge higher prices — not because they are better, but because they are perceived that way. Studies show consistent branding can increase revenue by up to 23%.',
      },
      {
        heading: 'First Step: Brand Audit',
        body: 'Look at all your brand touchpoints: website, social media, business card, email signature, vehicle wraps. Are they consistent? Do they represent what you stand for?',
      },
      {
        heading: 'Professional Brand in 14 Days',
        body: 'A complete brand identity — logo, color palette, typography, social media assets, and content calendar — can be delivered in 14 days. The investment pays for itself through higher close rates, often within weeks.',
      },
    ],
  },
};

export default function BlogPostEnPage({ params }: { params: { slug: string } }) {
  const post = postData[params.slug];

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
        <Link href="/en/blog" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/6 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl">
          <Link href="/en/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight sm:text-4xl mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
            <span>{post.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              {post.intro}
            </p>

            {post.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-white mt-10 mb-4">{section.heading}</h2>
                <p className="text-gray-400 leading-relaxed">{section.body}</p>
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 glass rounded-2xl p-8 text-center border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Implement This?
            </h3>
            <p className="text-gray-400 mb-6">
              Ovivo helps you deploy AI and automation in your business — with clear ROI and results in weeks.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl glass border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
