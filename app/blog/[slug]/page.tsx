import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className="mt-8">
            <Badge>AI Tools</Badge>
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span>February 15, 2024</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                8 min read
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-2xl mb-12">
            <img
              src="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Blog post"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              In today's fast-paced business environment, automation and AI tools have become essential for growth and efficiency. This guide explores the key strategies and tools you need to succeed.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">Introduction</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you're running a small business or managing a large enterprise, the right tools can make all the difference. AI and automation have revolutionized how we approach business planning, marketing, and operations.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">Key Benefits</h2>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Save 10-20 hours per week on repetitive tasks</li>
              <li>Increase conversion rates by 30-50%</li>
              <li>Scale your operations without hiring more staff</li>
              <li>Make data-driven decisions with AI insights</li>
              <li>Improve customer experience and satisfaction</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">Step-by-Step Implementation</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Let's walk through how to implement these strategies in your business:
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-900">Step 1: Audit Your Current Process</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Before implementing any new tools, take time to understand your current workflows. Identify bottlenecks, repetitive tasks, and areas where automation could have the biggest impact.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-900">Step 2: Choose the Right Tools</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Not all tools are created equal. Focus on solutions that integrate well with your existing systems and provide clear ROI. Look for tools that offer AI-powered features like predictive analytics and intelligent automation.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-900">Step 3: Start Small and Scale</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Begin with one area of your business. Once you see results, gradually expand automation to other departments. This approach minimizes risk and allows your team to adapt.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">Best Practices</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Here are some proven best practices to maximize your results:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Always test automation workflows before going live</li>
              <li>Monitor performance metrics regularly</li>
              <li>Keep your team trained on new tools and processes</li>
              <li>Regularly review and optimize your automations</li>
              <li>Balance automation with human touch points</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">Conclusion</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Implementing AI and automation in your business doesn't have to be complicated. Start with the basics, focus on high-impact areas, and scale gradually. The businesses that thrive in the coming years will be those that embrace these technologies while maintaining a customer-centric approach.
            </p>
          </div>

          <Card className="mt-12 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to Implement These Strategies?
              </h3>
              <p className="mt-3 text-gray-600">
                Let Ovivo help you automate and scale your business with AI-powered tools and expert execution.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/chat">
                  <Button size="lg">
                    Try Ovivo AI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    View Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
