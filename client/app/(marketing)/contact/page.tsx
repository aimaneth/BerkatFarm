'use client';

import React, { useState, useEffect } from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Phone/WhatsApp',
    details: '+60 13-333 2121',
    description: 'Mon-Fri from 8am to 5pm'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    details: 'contact@berkatfarm.com',
    description: "We'll respond within 24 hours"
  },
  {
    icon: MapPinIcon,
    title: 'Location',
    details: '123 Farm Road',
    description: 'Countryside, State 12345'
  },
  {
    icon: ClockIcon,
    title: 'Opening Hours',
    details: 'Monday to Saturday',
    description: '9:00 AM - 5:00 PM'
  }
];

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/berkatfarmtrading',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100064940986424',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
];

const MAX_MESSAGE_LENGTH = 500;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const [characterCount, setCharacterCount] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  const handleFocus = (name: string) => {
    setFocusedField(name);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setCharacterCount(0);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: keyof FormErrors) => `
    w-full px-4 py-3 rounded-lg border 
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
    ${focusedField === fieldName ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''}
    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
    transition-all duration-200 ease-in-out
    transform ${focusedField === fieldName ? 'scale-[1.02]' : 'scale-100'}
  `;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px]">
        <OptimizedImage
          src="/images/contact/hero.jpg"
          alt="Contact Us"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info) => (
              <div 
                key={info.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-emerald-600 font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-gray-500">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-8">
              Connect With Us
            </h3>
            <div className="flex justify-center items-center space-x-12">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 
                    rounded-2xl shadow-lg flex items-center justify-center 
                    transform transition-all duration-300 
                    group-hover:scale-110 group-hover:shadow-xl 
                    group-hover:rotate-3 group-hover:-translate-y-2
                    before:absolute before:inset-0 before:bg-gradient-to-br 
                    before:from-emerald-500/20 before:to-teal-500/20 
                    before:opacity-0 before:transition-opacity before:duration-300 
                    group-hover:before:opacity-100 before:rounded-2xl
                    overflow-hidden"
                  >
                    <div className="relative">
                      <social.icon 
                        className="h-10 w-10 text-gray-600 transition-all duration-300 
                        group-hover:text-emerald-600 group-hover:scale-110" 
                      />
                    </div>
                  </div>
                  <div className="mt-4 transform transition-all duration-300 group-hover:scale-110">
                    <p className="text-base font-medium text-gray-800 group-hover:text-emerald-600">
                      {social.name}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-emerald-500 mt-1">
                      Follow us
                    </p>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-teal-500/0 
                    opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 
                    group-hover:duration-200 animate-gradient-xy pointer-events-none"
                  />
                </a>
              ))}
            </div>
            <p className="mt-8 text-gray-600 max-w-md mx-auto">
              Stay updated with our latest news, farm activities, and product launches by following us on social media.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-6">
                Send us a Message
              </h2>

              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  <div className="flex items-center">
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        <span>Message sent successfully! We'll get back to you soon.</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 mr-2" />
                        <span>Failed to send message. Please try again.</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={handleBlur}
                      className={getInputClassName('firstName')}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={handleBlur}
                      className={getInputClassName('lastName')}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={getInputClassName('email')}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    className={getInputClassName('subject')}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows={4}
                      maxLength={MAX_MESSAGE_LENGTH}
                      className={`${getInputClassName('message')} resize-none`}
                      placeholder="Your message..."
                    />
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {characterCount}/{MAX_MESSAGE_LENGTH}
                    </div>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 text-white bg-gradient-to-r from-emerald-500 to-teal-400 
                      ${!isSubmitting && 'hover:from-emerald-600 hover:to-teal-500'} 
                      rounded-lg shadow-md hover:shadow-lg transition-all duration-200 
                      transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 
                      rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-6">
                Visit Our Farm
              </h2>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316952784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1435606250170"
                  className="absolute inset-0 w-full h-full border-0 filter saturate-[0.85] contrast-[1.1]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Getting Here
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-emerald-500" />
                    123 Farm Road, Countryside, State 12345
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-emerald-500" />
                    Open Monday to Saturday, 9:00 AM - 5:00 PM
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-emerald-800 mb-2">Transportation Options:</h4>
                  <ul className="text-emerald-600 space-y-1">
                    <li>• Public Bus: Routes 101, 102 (Stop: Farm Junction)</li>
                    <li>• Car: Free parking available on site</li>
                    <li>• Bicycle: Bike racks provided</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What are your visiting hours?
              </h3>
              <p className="text-gray-600">
                We're open Monday through Saturday, from 9:00 AM to 5:00 PM. Farm tours are available by appointment.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do you offer farm tours?
              </h3>
              <p className="text-gray-600">
                Yes, we offer guided tours of our farm facilities. Please contact us to schedule a tour. Tours typically last 1-2 hours and include visits to our dairy facilities, pastures, and processing units.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Can I buy products directly from the farm?
              </h3>
              <p className="text-gray-600">
                Yes, we have a farm shop where you can purchase our fresh products directly. Check our opening hours before visiting. We offer fresh milk, dairy products, and meat products daily.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do you offer bulk purchasing options?
              </h3>
              <p className="text-gray-600">
                Yes, we provide bulk purchasing options for restaurants, hotels, and other businesses. Contact us for wholesale pricing and delivery arrangements.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, bank transfers, and cash payments. For bulk orders, we can arrange for invoice-based payments.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Do you provide delivery services?
              </h3>
              <p className="text-gray-600">
                Yes, we offer delivery services within a 50-mile radius of our farm. Delivery charges may apply based on distance and order value. Contact us for delivery options and scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 