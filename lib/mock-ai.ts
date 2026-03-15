export async function mockChatResponse(prompt: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('business plan')) {
    const industry = extractIndustry(prompt);
    const location = extractLocation(prompt);
    return `I'll help you create a comprehensive business plan for your ${industry} in ${location}. Let me outline the key components:

**Executive Summary:**
Your ${industry} business will serve ${location} and surrounding areas, focusing on quality service and customer satisfaction.

**Market Analysis:**
- Target market: Local residents and businesses in ${location}
- Competition: Moderate, opportunity for differentiation
- Market size: Growing demand in the region

**Business Model:**
- Revenue streams: Direct sales, subscriptions, premium services
- Pricing strategy: Competitive with value-added services
- Customer acquisition: Digital marketing, local partnerships

**Financial Projections:**
- Startup costs: €15,000 - €30,000
- Monthly revenue target (Year 1): €5,000 - €10,000
- Break-even: 6-9 months

**Next Steps:**
1. Refine your unique value proposition
2. Develop detailed financial model
3. Create marketing strategy
4. Set up legal structure

Would you like me to dive deeper into any specific section?`;
  }

  if (lowerPrompt.includes('marketing plan')) {
    return `I'll create a strategic marketing plan for you:

**30-Day Marketing Strategy:**

**Week 1-2: Foundation**
- Set up social media profiles (Instagram, Facebook)
- Create brand guidelines
- Develop content calendar
- Launch Google My Business

**Week 3-4: Launch Campaign**
- 15 social media posts (mix of educational, promotional, behind-the-scenes)
- Run initial Facebook/Instagram ads (€10-15/day budget)
- Email sequence for new leads
- Local partnership outreach

**Content Themes:**
- Monday: Tips & Education
- Wednesday: Customer Stories
- Friday: Behind the Scenes
- Sunday: Special Offers

**Ad Strategy:**
- Targeting: 25-55 years, 10km radius
- Budget: €300-450/month
- Focus: Lead generation and brand awareness

**Metrics to Track:**
- Reach & Engagement
- Website traffic
- Lead conversions
- Cost per lead

Want me to detail any specific platform strategy?`;
  }

  if (lowerPrompt.includes('ad cop') || lowerPrompt.includes('copy')) {
    const business = extractIndustry(prompt);
    return `Here are 5 high-converting ad copies for your ${business}:

**Ad Copy 1: Problem-Solution**
"Tired of [common problem]? We've helped 500+ customers in [location] solve this exact issue. Book your free consultation today!"

**Ad Copy 2: Social Proof**
"⭐⭐⭐⭐⭐ Rated 4.9/5 by local customers. See why [location] trusts us for their ${business} needs. Limited slots available!"

**Ad Copy 3: Urgency**
"This Week Only: Save 20% on all services! Don't miss out - only 15 spots left. Click to claim your discount now!"

**Ad Copy 4: Value Proposition**
"Quality ${business} services that don't break the bank. Fast, reliable, and affordable. Get your free quote in 60 seconds!"

**Ad Copy 5: Educational Hook**
"Did you know? [Interesting fact about industry]. Learn how we use this to deliver 2x better results. Free guide inside!"

Each copy includes:
- Clear benefit
- Call to action
- Urgency or social proof
- Mobile-optimized length

Need variations for different platforms?`;
  }

  return `I understand you're asking about: "${prompt}"

As Ovivo AI, I can help you with:

**Business Planning:**
- Complete business plan development
- Market analysis and competitor research
- Financial projections and budgeting
- Growth strategies

**Marketing Strategy:**
- 30-day content calendars
- Social media strategies
- Ad campaign planning
- Funnel optimization

**Execution Services:**
- Done-for-you implementation
- Content creation
- Ad management
- Website development

What specific aspect would you like me to focus on? I can provide detailed plans, actionable strategies, or connect you with our team for full implementation.`;
}

export async function generateBusinessPlan(data: {
  businessName: string;
  industry: string;
  location: string;
  targetAudience: string;
  budget: string;
  services: string;
  competitors: string;
  goals3mo: string;
  goals12mo: string;
}): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return `# Business Plan: ${data.businessName}

## Executive Summary

${data.businessName} is a ${data.industry} business based in ${data.location}, dedicated to serving ${data.targetAudience}. Our mission is to deliver exceptional value through ${data.services}, positioning ourselves as a trusted partner in the local market.

**Key Highlights:**
- Launch budget: ${data.budget}
- Target market: ${data.targetAudience}
- Initial location: ${data.location}
- Core offerings: ${data.services}

## Market Analysis

**Target Market:**
${data.targetAudience} in ${data.location} and surrounding areas. This demographic represents a growing segment with increasing demand for quality ${data.industry} services.

**Competitive Landscape:**
Current competitors include: ${data.competitors}

**Competitive Advantage:**
- Customer-centric approach
- Modern digital presence
- Flexible service packages
- Transparent pricing
- Quick response times

## Products & Services

**Core Offerings:**
${data.services}

**Service Tiers:**
1. **Essential Package** - Entry-level service for budget-conscious customers
2. **Professional Package** - Comprehensive solution for regular clients
3. **Premium Package** - Full-service option with priority support

**Pricing Strategy:**
Competitive pricing based on market research, with value-added services justifying premium positioning.

## Marketing & Sales Strategy

**Customer Acquisition Channels:**
1. **Digital Marketing (40% of budget)**
   - Google Ads for local searches
   - Facebook/Instagram ads targeting ${data.location}
   - SEO for organic traffic

2. **Content Marketing (20%)**
   - Educational blog posts
   - Social media engagement
   - Email newsletters

3. **Local Partnerships (20%)**
   - Cross-promotions with complementary businesses
   - Community events
   - Local business associations

4. **Referral Program (20%)**
   - Incentivize existing customers
   - Build word-of-mouth

**Sales Funnel:**
Awareness → Interest (Free consultation) → Consideration (Quote) → Purchase → Loyalty

## Operations Plan

**Daily Operations:**
- Customer inquiries and bookings
- Service delivery
- Quality control
- Customer follow-up

**Key Systems:**
- CRM for customer management
- Booking/scheduling system
- Payment processing
- Inventory management (if applicable)

**Team Structure:**
- Phase 1 (Months 1-3): Founder + 1-2 part-time staff
- Phase 2 (Months 4-12): Add 2-3 full-time employees
- Phase 3 (Year 2+): Scale team based on demand

## Financial Projections

**Startup Costs:**
- Business registration & legal: €500-1,000
- Equipment & supplies: €3,000-8,000
- Marketing & branding: €2,000-5,000
- Website & technology: €1,500-3,000
- Working capital: €5,000-10,000
**Total: ${data.budget}**

**Revenue Projections:**

**Year 1:**
- Q1: €3,000-5,000/month (building phase)
- Q2: €5,000-8,000/month (growth)
- Q3: €8,000-12,000/month (scaling)
- Q4: €10,000-15,000/month (optimization)

**Year 1 Total:** €78,000-120,000

**Break-even Analysis:**
Expected break-even: 6-9 months with consistent marketing and operations.

**Key Metrics:**
- Customer acquisition cost (CAC): €50-100
- Lifetime value (LTV): €500-1,500
- LTV:CAC ratio target: 5:1
- Monthly churn rate: <5%

## Milestones & Timeline

**3-Month Goals:**
${data.goals3mo}

**Key Milestones:**
- Month 1: Business setup, branding, initial marketing
- Month 2: First 10-20 customers, refine processes
- Month 3: Scale marketing, optimize operations

**12-Month Goals:**
${data.goals12mo}

**Key Milestones:**
- Month 6: Consistent €8,000-10,000/month revenue
- Month 9: Expand service offerings or locations
- Month 12: Achieve profitability, plan Year 2 growth

## Risk Analysis & Mitigation

**Key Risks:**
1. **Market Competition** → Focus on differentiation and customer service
2. **Cash Flow** → Maintain 3-6 months runway, flexible pricing
3. **Customer Acquisition** → Diversify marketing channels
4. **Quality Control** → Standard operating procedures, feedback loops

## Next Steps

**Immediate Actions (Next 30 Days):**
1. Register business and obtain necessary licenses
2. Set up business bank account and accounting system
3. Create brand identity (logo, colors, messaging)
4. Build website and social media presence
5. Launch initial marketing campaigns
6. Book first customers

**Success Factors:**
- Consistent execution of marketing plan
- Excellent customer service
- Regular financial monitoring
- Adaptability based on feedback

---

**Ready to Launch?**

This business plan provides a solid foundation. Ovivo can help you execute each phase with our Done-For-You services, including:
- Complete website setup
- Marketing campaign management
- Funnel building
- Content creation

Book a strategy call to discuss implementation: [ovivo.io/contact]`;
}

export async function generateMarketingPlan(data: {
  businessName: string;
  industry: string;
  platforms: string[];
  budget: string;
  contentStyle: string;
  offers: string;
  location: string;
}): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const platformsText = data.platforms.join(', ');
  const budgetNum = parseInt(data.budget.replace(/[^0-9]/g, '')) || 500;

  return `# 30-Day Marketing Plan: ${data.businessName}

## Campaign Overview

**Business:** ${data.businessName}
**Industry:** ${data.industry}
**Location:** ${data.location}
**Platforms:** ${platformsText}
**Monthly Budget:** ${data.budget}
**Content Style:** ${data.contentStyle}

---

## Week 1: Foundation & Launch (Days 1-7)

### Content Calendar

**Day 1-2: Profile Optimization**
- Update all social media bios
- Professional cover images and profile photos
- Consistent branding across ${platformsText}

**Day 3: Introduction Post**
"👋 Meet ${data.businessName}! We're here to [value proposition]. Based in ${data.location}, we're excited to serve our community with ${data.offers}."

**Day 4: Behind-the-Scenes**
Show your workspace, team, or process. Build authenticity and trust.

**Day 5: Customer Pain Point**
Educational post addressing a common problem in ${data.industry}.

**Day 6: Offer Announcement**
Introduce your core offer: ${data.offers}

**Day 7: Engagement Post**
"What's your biggest challenge with [industry-related topic]? Comment below!"

### Paid Advertising - Week 1
**Budget Allocation:** 25% of monthly budget (€${budgetNum * 0.25}/week)

**Campaign 1: Brand Awareness**
- Objective: Reach
- Targeting: ${data.location}, 25-55 years old
- Creative: Introduction video or carousel
- Duration: 7 days

---

## Week 2: Engagement & Trust (Days 8-14)

### Content Calendar

**Day 8: Customer Testimonial**
Share a success story or positive review (create template if new business).

**Day 9: Educational Carousel**
"5 Things You Should Know About [Industry Topic]"

**Day 10: Quick Tip Video**
Short-form video (Reels/TikTok style) with actionable advice.

**Day 11: Special Offer**
"This Week Only: [Specific offer] - Limited spots available!"

**Day 12: Day in the Life**
Story series showing your daily operations.

**Day 13: FAQ Post**
Answer common questions about your services.

**Day 14: Weekend Inspiration**
Motivational or lifestyle content related to your industry.

### Paid Advertising - Week 2
**Campaign 2: Engagement & Traffic**
- Objective: Website visits
- Retargeting: Week 1 ad viewers
- Creative: Value proposition + call-to-action
- Landing page: Service overview

---

## Week 3: Conversion Focus (Days 15-21)

### Content Calendar

**Day 15: Case Study**
Detailed before/after or results story.

**Day 16: Product/Service Spotlight**
Deep dive into one of your main offerings.

**Day 17: Limited-Time Offer**
"⏰ 48-Hour Flash Sale: Book now and save [X]%"

**Day 18: User-Generated Content**
Share customer photos, reviews, or experiences.

**Day 19: Expert Tips Post**
Position yourself as the authority in ${data.industry}.

**Day 20: Comparison Post**
"Why Choose ${data.businessName}? Here's what sets us apart..."

**Day 21: Call-to-Action**
Direct promotion: "Ready to get started? Book your free consultation!"

### Paid Advertising - Week 3
**Campaign 3: Lead Generation**
- Objective: Conversions
- Lead magnet: Free consultation, guide, or discount
- Budget: 30% of monthly budget
- A/B test two different ad creatives

---

## Week 4: Scale & Optimize (Days 22-30)

### Content Calendar

**Day 22: Team Spotlight**
Introduce team members (or yourself if solo).

**Day 23: Industry News/Trends**
Comment on relevant news in ${data.industry}.

**Day 24: Poll/Survey**
"Help us serve you better: What service would you like to see next?"

**Day 25: Transformation Story**
Powerful before/after content.

**Day 26: Partnership Announcement**
Collaborate with local business or influencer.

**Day 27: Urgency Post**
"Only 3 spots left this month! Book now: [link]"

**Day 28: Live Q&A**
Go live to answer questions and connect with audience.

**Day 29: Month-End Recap**
"Thank you for an amazing month! Here's what we accomplished..."

**Day 30: Next Month Teaser**
Preview what's coming and maintain momentum.

### Paid Advertising - Week 4
**Campaign 4: Retargeting**
- Target everyone who engaged but didn't convert
- Strong offer with urgency
- Budget: 25% of monthly budget
- Multiple touchpoints across platforms

---

## Platform-Specific Strategies

${data.platforms.includes('Instagram') ? `
### Instagram Strategy
- 4-5 posts per week
- Daily stories
- 3-5 Reels per week
- Hashtag strategy: 15-25 relevant hashtags
- Best posting times: 7-9 AM, 12-1 PM, 7-9 PM
` : ''}

${data.platforms.includes('Facebook') ? `
### Facebook Strategy
- 3-4 posts per week
- Facebook Groups engagement
- Event creation for promotions
- Facebook Messenger automation
- Best posting times: 8-10 AM, 1-3 PM
` : ''}

${data.platforms.includes('Google Ads') ? `
### Google Ads Strategy
- Local service ads
- Search campaigns: "[industry] in ${data.location}"
- Display retargeting
- Budget: 40% on search, 30% on display, 30% on local
` : ''}

${data.platforms.includes('TikTok') ? `
### TikTok Strategy
- 5-7 videos per week
- Trending sounds and challenges
- Educational + entertaining content
- Hashtag: #${data.industry.replace(/\s+/g, '')} #SmallBusiness
` : ''}

---

## Content Themes

**${data.contentStyle} Style Includes:**
- Authentic, relatable tone
- Visual consistency (brand colors, fonts)
- Mix of formats: photos, videos, carousels, stories
- Balance: 60% educational, 30% engaging, 10% promotional

---

## Key Performance Indicators (KPIs)

**Track Weekly:**
- Reach and impressions
- Engagement rate (target: >3%)
- Click-through rate (target: >1.5%)
- Website traffic
- Lead generation (target: 20-50 leads/month)
- Cost per lead (target: <€20)

**Track Monthly:**
- Conversion rate (target: >5%)
- Customer acquisition cost
- Return on ad spend (target: >3x)
- Social media growth
- Email list growth

---

## Budget Breakdown

**Total Monthly Budget:** ${data.budget}

**Allocation:**
- Paid Ads: 70% (€${budgetNum * 0.7})
  - ${platformsText.split(',')[0]}: 40%
  - ${platformsText.split(',')[1] || 'Other platforms'}: 30%
  - Retargeting: 30%
- Content Creation: 20% (€${budgetNum * 0.2})
- Tools & Software: 10% (€${budgetNum * 0.1})

---

## Let Ovivo Handle This For You

Creating and executing this plan takes significant time and expertise. Our Done-For-You Marketing Package includes:

✅ Complete content calendar with designed posts
✅ Ad campaign setup and management
✅ Weekly optimization and reporting
✅ Email marketing sequences
✅ Landing pages and funnels

**Investment:** €79-149/month or Done-For-You service starting at €3,000

Book a strategy call to discuss: [ovivo.io/contact]

---

*This plan is tailored for ${data.businessName}. Adjust based on your specific results and audience feedback.*`;
}

function extractIndustry(text: string): string {
  const industries = ['restaurant', 'salon', 'hair salon', 'cleaning company', 'gym', 'cafe', 'shop', 'store', 'clinic', 'studio'];
  for (const industry of industries) {
    if (text.toLowerCase().includes(industry)) {
      return industry;
    }
  }
  return 'business';
}

function extractLocation(text: string): string {
  const locations = ['Hamburg', 'Berlin', 'Munich', 'Lingen', 'Frankfurt', 'Cologne'];
  for (const location of locations) {
    if (text.includes(location)) {
      return location;
    }
  }
  return 'your city';
}

export async function mockVoiceGeneration(
  text: string,
  voice: string,
  language: string,
  speed: number
): Promise<{ success: boolean; message: string }> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
    message: `Voice generated successfully! Preview: "${text.substring(0, 50)}..." with ${voice} voice in ${language} at ${speed}x speed. In production, this would generate an actual audio file.`
  };
}
