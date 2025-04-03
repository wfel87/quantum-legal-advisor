
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ContactFormValues } from '@/components/contact/ContactForm';
import { sendEmailNotification, sendSMSNotification, ContactFormData } from '@/services/awsService';

export const useContactForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const handleSubmit = async (data: ContactFormValues) => {
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
  
  return {
    isSubmitting,
    submissionError,
    handleSubmit,
  };
};
