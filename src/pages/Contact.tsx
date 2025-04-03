
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { sendEmailNotification, sendSMSNotification, ContactFormData } from '@/services/awsService';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().min(1, { message: 'Company name is required' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  preferredContact: z.enum(['email', 'phone'], {
    required_error: 'Please select a preferred contact method',
  }),
  agreedToTerms: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      preferredContact: 'email',
      agreedToTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      console.log('Form data submitted:', data);
      
      // Format the data for sending to AWS services
      const contactData: ContactFormData = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        preferredContact: data.preferredContact,
      };
      
      // Send data based on preferred contact method
      if (data.preferredContact === 'email') {
        await sendEmailNotification(contactData);
        toast.success('Your demo request has been submitted! We will contact you by email shortly.');
      } else {
        if (!data.phone || data.phone.trim() === '') {
          throw new Error('Phone number is required for SMS notifications');
        }
        await sendSMSNotification(contactData);
        toast.success('Your demo request has been submitted! We will contact you by phone shortly.');
      }
      
      // Reset form
      form.reset();
      
      // Redirect to home page after a short delay
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was a problem submitting your request';
      
      setSubmissionError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Phone field is required when preferred contact method is phone
  const preferredContact = form.watch('preferredContact');
  const phoneIsRequired = preferredContact === 'phone';

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Demo</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill out the form below and one of our representatives will contact you to schedule a personalized demo of DocuScan.
          </p>
        </div>
        
        {submissionError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {submissionError}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number {phoneIsRequired ? <span className="text-destructive">*</span> : '(Optional)'}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please tell us about your needs and what you're looking for in a document analysis solution." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="preferredContact"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Preferred Contact Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Trigger validation for phone if phone is selected
                          if (value === 'phone') {
                            form.trigger('phone');
                          }
                        }}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="phone" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            Phone
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      We'll contact you via your preferred method using our secure AWS notification system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreedToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        I agree to the terms of service and privacy policy
                      </FormLabel>
                      <FormDescription>
                        We'll never share your information with third parties without your permission.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
