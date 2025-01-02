import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/auth.config';
import { 
  Heart as HeartIcon,
  Leaf as GrassIcon,
  Droplet as WaterIcon,
  Shield as CertifiedIcon,
  Scale as WeightIcon,
  Truck as DeliveryIcon,
} from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { InteractiveMap } from '@/components/maps/InteractiveMap';
import { TestimonialImage } from '@/components/ui/TestimonialImage';

const features = [
  {
    name: 'Quality Livestock',
    description: 'Our animals are raised with the highest standards of care in spacious, natural environments.',
    icon: HeartIcon,
  },
  {
    name: 'Natural Grazing',
    description: 'All our livestock graze freely on lush, natural pastures rich in nutrients.',
    icon: GrassIcon,
  },
  {
    name: 'Clean Facilities',
    description: 'State-of-the-art facilities ensure the highest standards of hygiene and quality.',
    icon: WaterIcon,
  },
  {
    name: 'Halal Certified',
    description: 'All our meat products are certified halal, meeting strict religious standards.',
    icon: CertifiedIcon,
  },
  {
    name: 'Premium Products',
    description: 'From fresh meat to dairy, all our products meet premium quality standards.',
    icon: WeightIcon,
  },
  {
    name: 'Fresh Delivery',
    description: 'Products delivered fresh to your door, maintaining quality from farm to table.',
    icon: DeliveryIcon,
  },
];

const testimonials = [
  {
    name: "Ahmad Rahman",
    role: "Restaurant Owner",
    image: "/images/testimonials/customer-1.jpg",
    content: "The quality of meat and dairy products from Berkat Farm is exceptional. Our customers love the taste and freshness."
  },
  {
    name: "Sarah Abdullah",
    role: "Butcher Shop Owner",
    image: "/images/testimonials/customer-2.jpg",
    content: "We exclusively source our premium cuts from Berkat Farm. Their halal-certified meat is consistently excellent."
  },
  {
    name: "Mohammed Yusof",
    role: "Regular Customer",
    image: "/images/testimonials/customer-3.jpg",
    content: "From their fresh milk to premium lamb, every product shows their commitment to quality and ethical farming."
  }
];

const livestock = [
  {
    name: 'Premium Beef',
    description: 'High-quality beef from our grass-fed cattle',
    image: '/images/products/beef.jpg',
    stats: ['Grade A', 'Grass-fed', 'Halal Certified']
  },
  {
    name: 'Fresh Lamb',
    description: 'Tender lamb raised in natural pastures',
    image: '/images/products/lamb.jpg',
    stats: ['Premium Cut', 'Free Range', 'Halal Certified']
  },
  {
    name: 'Farm Chicken',
    description: 'Free-range chicken raised naturally',
    image: '/images/products/chicken.jpg',
    stats: ['Free Range', 'Natural Feed', 'Halal Certified']
  },
  {
    name: 'Fresh Farm Milk',
    description: 'Pure, fresh milk from our dairy cows',
    image: '/images/products/milk.jpg',
    stats: ['100% Fresh', 'No Preservatives', 'Grade A']
  },
  {
    name: 'Low Fat Milk',
    description: 'Healthy option with all the nutrients, less fat',
    image: '/images/products/low-fat-milk.jpg',
    stats: ['2% Fat', 'Rich in Calcium', 'High Protein']
  },
  {
    name: 'Fresh Yogurt',
    description: 'Creamy yogurt made from our farm-fresh milk',
    image: '/images/products/yogurt.jpg',
    stats: ['Probiotic', 'No Additives', 'Natural Taste']
  }
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <OptimizedImage
              src="/images/hero-bg.jpg"
              alt="Berkat Livestock Farm"
              fill
              className="object-cover object-center motion-safe:animate-ken-burns"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                <span className="block mb-2">
                  Premium Quality
                </span>
                <span className="block text-emerald-400">
                  Farm Products
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Experience the finest quality meat and dairy products from our ethically raised livestock. 
                We're committed to delivering excellence from our farm to your table.
              </p>
              <div className="mt-8">
                <MagneticButton>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500"
                  >
                    View Our Livestock
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Farm Image Grid */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg">
                    <OptimizedImage
                      src="/images/farm-1.jpg"
                      alt="Healthy Goats Grazing"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/images/farm-2.jpg"
                      alt="Dairy Cattle Feeding"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/images/farm-3.jpg"
                      alt="Quality Sheep"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src="/images/farm-4.jpg"
                      alt="Fresh Farm Milk"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
              Our Commitment to Excellence
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              We prioritize animal welfare and quality in every aspect of our operation
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card3D key={feature.name} className="relative p-6 bg-white rounded-2xl">
                <div className="relative flex items-center space-x-4">
                  <feature.icon className="h-8 w-8 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Livestock Showcase Section */}
      <div className="relative py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
              Our Products
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Premium quality meat and dairy products from our farm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livestock.map((product) => (
              <Card3D key={product.name} className="relative overflow-hidden rounded-2xl bg-white">
                <div className="relative h-[300px]">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-200 mb-4">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.stats.map((stat, index) => (
                        <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Location Section */}
      <div className="relative py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
              Visit Our Farm
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Come see our livestock and learn about our ethical farming practices
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <InteractiveMap />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text inline-block">
              What Our Customers Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Join our community of satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card3D key={testimonial.name} className="p-6 bg-white rounded-2xl">
                <div className="flex items-center space-x-4">
                  <TestimonialImage
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-emerald-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{testimonial.content}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              &copy; 2024 Berkat Farm. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 