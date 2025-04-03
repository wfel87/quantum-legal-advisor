
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "DocuScan AI completely transformed our contract review process. What used to take days now takes minutes, with even greater accuracy.",
      author: "Sarah Johnson",
      title: "Legal Director, Apex Law Partners",
      rating: 5
    },
    {
      quote: "The quantum computing features provide insights we would never have discovered using traditional methods. It's like having a team of experts reviewing every document.",
      author: "Michael Chen",
      title: "Chief Legal Officer, TechGlobal Inc",
      rating: 5
    },
    {
      quote: "We've reduced our document processing time by 78% while increasing our compliance accuracy. The ROI has been remarkable.",
      author: "Alexandra Rodriguez",
      title: "Compliance Manager, FinServe Group",
      rating: 5
    },
    {
      quote: "The platform's ability to handle complex legal language and extract meaningful insights has been a game-changer for our due diligence process.",
      author: "David Patel",
      title: "Partner, Morrison & Ellis LLP",
      rating: 4
    },
    {
      quote: "Their customer support team is just as impressive as the technology. They worked closely with us to customize the platform to our specific needs.",
      author: "Jennifer Taylor",
      title: "Operations Director, Healthcare Compliance Co.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-background/40 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from legal professionals who have transformed their document workflows with DocuScan AI.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1 pl-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-background glass-card">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          size={18} 
                          className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static transform-none mx-2" />
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
