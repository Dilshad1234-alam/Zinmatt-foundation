import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import GradientIconBox from '../components/ui/GradientIconBox';
import SectionHeader from '../components/ui/SectionHeader';
import MobileCardCarousel from '../components/ui/MobileCardCarousel';
import {
  Heart,
  GraduationCap,
  Eye,
  HeartHandshake,
  Leaf,
  Sparkles,
  HeartPulse,
  Award,
  ArrowRight,
  CheckCircle2,
  Quote,
} from 'lucide-react';

/**
 * Our Impact Page for ZINMATT Foundation
 * Matches exact reference layout:
 * 1. Full-Width Dark Banner + 4-Item Horizontal Strip (#FFF0E8)
 * 2. How Our Mission Translates Into Action — 2x2 Photo Cards (#FFFFFF)
 * 3. Why This Mission Matters — 3 Testimonial Cards (#FFF9F5)
 * 4. Honest Reporting. Real Community Participation. (#FFFFFF)
 * 5. Final Call to Action Banner (#FB7336 -> #FCC241) & Footer
 */
export default function OurImpact() {
  // Horizontal 4-Item Summary Strip Data
  const summaryStrip = [
    {
      id: 'strip-1',
      icon: GraduationCap,
      title: 'Children Supported',
      subtitle: 'Expanding access to education for all children.',
    },
    {
      id: 'strip-2',
      icon: Eye,
      title: 'Educational Resources Distributed',
      subtitle: 'Books, learning kits & accessible aids.',
    },
    {
      id: 'strip-3',
      icon: HeartHandshake,
      title: 'Elderly People Reached',
      subtitle: 'Dignity, companionship & community care.',
    },
    {
      id: 'strip-4',
      icon: Leaf,
      title: 'Cleanliness Drives Conducted',
      subtitle: 'Cleaner, greener local neighborhoods.',
    },
  ];

  // 4x2 Action Cards Data (4 cards in Line 1 & Line 2)
  const actionCards = [
    {
      id: 'action-1',
      title: 'Free Education for Underprivileged Children',
      description:
        'Bridging the learning gap through accessible evening centers, foundational literacy learning, and government school re-enrollment assistance.',
      icon: GraduationCap,
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-2',
      title: 'Inclusive Support for Visually Impaired Children',
      description:
        'Custom tactile STEM learning kits, customized Braille toolkits, and screen-reader digital assistive technology training.',
      icon: Eye,
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-3',
      title: 'Elderly Care & Welfare',
      description:
        'Restoring dignity, respect, and companionship through routine doorstep checkups, essential medicines, and nutritious meals.',
      icon: HeartHandshake,
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-4',
      title: 'Environmental Cleanliness & Green Drives',
      description:
        'Mobilizing youth brigades for riverbank cleanups, neighborhood waste segregation, and native sapling plantations.',
      icon: Leaf,
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-5',
      title: 'Women Livelihoods & Self-Reliance',
      description:
        'Certified vocational garment tailoring, digital skills, and starter micro-grants empowering women to achieve economic independence.',
      icon: Sparkles,
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-6',
      title: 'Community Nutrition & Hot Kitchens',
      description:
        'Daily community hot food kitchens and rapid disaster relief dry ration kits serving marginalized families across settlements.',
      icon: Heart,
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-7',
      title: 'Slum Healthcare & Mobile Medical Camps',
      description:
        'Doorstep mobile health camps, essential generic medicines, vision testing, and free spectacles for low-income families.',
      icon: HeartPulse,
      image:
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
    {
      id: 'action-8',
      title: 'Youth Career & Digital Skills',
      description:
        'Practical computer labs, workplace digital certifications, interview coaching, and career guidance for ambitious youth.',
      icon: Award,
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      link: '/initiatives',
    },
  ];

  // Testimonials Data (5 Community Voices)
  const testimonials = [
    {
      id: 'test-1',
      quote:
        'Seeing children who once hesitated to hold a pencil now eagerly reading full sentences has been the most fulfilling experience of my life. ZINMATT creates an environment where every child feels seen and supported.',
      name: 'Alok Nambiar',
      role: 'Grassroots Education Volunteer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'test-2',
      quote:
        'The elderly companionship drives have shown us that dignity is as essential as food. Spending an hour listening to seniors’ life stories brings unmeasured comfort into their daily lives.',
      name: 'Neeta Joshi',
      role: 'Senior Care Coordinator',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'test-3',
      quote:
        'The cleanliness and Braille empowerment drives showed our whole neighbourhood what it means to take collective action. ZINMATT didn’t just give resources; they gave the community a shared purpose.',
      name: 'Rohit Giri',
      role: 'Civic Drive Lead & Supporter',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'test-4',
      quote:
        'Bringing mobile diagnosis and vision screening to rural clusters ensures preventive healthcare reaches families who cannot travel to hospitals. It saves lives every single week.',
      name: 'Dr. Ananya Sen',
      role: 'Community Health Officer',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'test-5',
      quote:
        'Watching a visually impaired child master their first Braille toolkit and smile with absolute pride proves that accessible tools can unlock unlimited human potential.',
      name: 'Kavita Rathore',
      role: 'Inclusive Literacy Mentor',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      fallbackImage:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-['Inter',_sans-serif] text-[#242424] antialiased overflow-x-hidden w-full">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-grow overflow-x-hidden w-full">
        {/* =========================================================================
            SECTION 1: Full-Width Vibrant Hero Banner + 4-Item Horizontal Strip
            ========================================================================= */}
        <section className="relative overflow-hidden bg-[#1E1E1E]">
          {/* Background Photograph - Clear, Vibrant, and Prominently Visible */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
              alt="Community impact background"
              className="w-full h-full object-cover object-center brightness-95 saturate-105"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80';
              }}
            />
            {/* Subtle light scrim - no heavy black blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />
          </div>

          {/* Banner Content - Larger, Taller Hero Banner */}
          <div className="relative z-10 py-20 sm:py-28 lg:py-36 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex flex-col justify-center text-center text-white px-4 sm:px-6">
            <Container size="default">
              {/* Bold Arial H1 */}
              <h1 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-5xl lg:text-[52px] leading-[1.2] tracking-tight mb-4 max-w-4xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Creating Meaningful, Lasting Change.
              </h1>

              {/* Concise Inter Subtitle */}
              <p className="font-['Inter',_sans-serif] text-white text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                Every step we take is guided by honesty, compassion, and a firm commitment to uplifting lives across education, inclusive care, elderly welfare, and environmental cleanliness.
              </p>
            </Container>
          </div>
        </section>

        {/* --- Full-Width #FFF0E8 Horizontal 4-Item Summary Strip --- */}
        <section className="bg-[#FFF0E8] border-b border-[#FB7336]/20 mt-3 py-4 sm:py-5">
          <Container size="default">
            <MobileCardCarousel
              items={summaryStrip}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start w-full"
              renderItem={(item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex items-start gap-3.5 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl border border-[#FB7336]/15 md:border-0 shadow-xs md:shadow-none h-full">
                    <GradientIconBox icon={IconComponent} size="sm" className="mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-base leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 2: How Our Mission Translates Into Action — 4 Cards in Line 1 & Line 2 (#FFFFFF)
            ========================================================================= */}
        <section className="pt-5 sm:pt-6 pb-4 sm:pb-5 bg-[#FFFFFF] border-b border-[#EEEEEE]/70">
          <Container size="default">
            <SectionHeader
              tag="WORKING ON THE GROUND"
              title="How Our Mission Translates Into Action"
              subtitle="Our foundational, grassroots actions dedicated to making immediate positive impacts on society."
              align="center"
              className="mb-4 sm:mb-5"
            />

            {/* 4x2 Grid (4 Cards per Line on Desktop) */}
            <MobileCardCarousel
              items={actionCards}
              desktopGridClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[1760px] mx-auto w-full"
              renderItem={(card) => (
                <Card
                  key={card.id}
                  surface="white"
                  padding="none"
                  className="overflow-hidden flex flex-col group border border-[#EEEEEE] hover:border-[#FB7336]/30 transition-all duration-300 shadow-sm hover:shadow-md h-full"
                >
                  {/* Card Top Image */}
                  <div className="relative w-full h-44 sm:h-48 md:h-52 overflow-hidden bg-[#FFF9F5]">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = card.fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow items-start">
                    <GradientIconBox icon={card.icon} size="md" className="mb-3" />
                    <h3 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-base sm:text-lg leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="font-['Inter',_sans-serif] text-[#666666] text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                      {card.description}
                    </p>
                    <Link
                      to={card.link}
                      className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#FB7336] hover:text-[#242424] transition-colors duration-200 mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 3: Why This Mission Matters — 3 Testimonial Cards (#FFF9F5)
            ========================================================================= */}
        <section className="pt-4 sm:pt-5 pb-4 sm:pb-5 bg-[#FFF9F5] border-b border-[#EEEEEE]/70">
          <Container size="default">
            <SectionHeader
              tag="VOICES FROM THE FIELD"
              title="Why This Mission Matters"
              subtitle="Real perspectives from grassroots educators, volunteers, and the families whose lives are touched every day."
              align="center"
              className="mb-4 sm:mb-5"
            />

            {/* 5-Column Testimonial Grid */}
            <MobileCardCarousel
              items={testimonials}
              desktopGridClassName="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 max-w-[1760px] mx-auto w-full"
              renderItem={(item) => (
                <Card
                  key={item.id}
                  surface="white"
                  className="p-5 sm:p-5 flex flex-col justify-between border border-[#EEEEEE] hover:border-[#FB7336]/30 shadow-sm hover:shadow-md transition-all duration-300 min-h-[290px] sm:min-h-[310px] h-full"
                >
                  <div>
                    {/* Top Quote Badge */}
                    <div className="w-9 h-9 rounded-xl bg-[#FFF0E8] border border-[#FB7336]/20 flex items-center justify-center text-[#FB7336] mb-4 select-none">
                      <Quote className="w-4 h-4 fill-[#FB7336] text-[#FB7336]" />
                    </div>

                    {/* Quote Text */}
                    <p className="font-['Inter',_sans-serif] text-[#242424] text-xs sm:text-sm leading-relaxed italic mb-5 line-clamp-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Bio */}
                  <div className="flex items-center gap-3 pt-3.5 border-t border-[#EEEEEE]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = item.fallbackImage;
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-[#FB7336]/30 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-xs sm:text-sm leading-tight truncate">
                        {item.name}
                      </h4>
                      <p className="font-['Inter',_sans-serif] text-[#666666] text-[11px] mt-0.5 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            />
          </Container>
        </section>

        {/* =========================================================================
            SECTION 4: Honest Reporting. Real Community Participation. (#FFFFFF)
            ========================================================================= */}
        <section className="py-6 sm:py-7 lg:py-8 bg-[#FFFFFF] border-b border-[#EEEEEE]/70">
          <Container size="default">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
              {/* Photo on Left (lg:col-span-6) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EEEEEE] group">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
                    alt="Community engagement and transparent fieldwork"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-[340px] sm:h-[400px] lg:h-[460px] object-cover "
                  />
                  {/* Clean Bottom Caption Pill */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-black/5 shadow-md flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full bg-[#FB7336]" />
                    <span className="text-xs font-bold text-[#242424] tracking-wide uppercase">
                      Verified Ground Audits
                    </span>
                  </div>
                </div>
              </div>

              {/* Content on Right (lg:col-span-6) */}
              <div className="lg:col-span-6 flex flex-col items-start lg:pl-4">
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] border border-[#FB7336]/20 text-[#FB7336] text-xs font-bold tracking-wider uppercase mb-3 select-none">
                  <span>OUR COMMITMENT TO TRANSPARENCY</span>
                </div>

                {/* Bold Arial H2 */}
                <h2 className="font-['Arial',_Helvetica,_sans-serif] text-[#242424] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                  Honest Reporting. Real Community Participation.
                </h2>

                {/* Inter Paragraph */}
                <p className="font-['Inter',_sans-serif] text-[#666666] text-base leading-relaxed mb-6">
                  We believe public trust is earned through complete honesty. ZINMATT Foundation is committed to sharing only verified milestones, genuine community photographs, and transparent updates on how resources are spent.
                </p>

                {/* 3 Clean Checkmark Bullet Lines */}
                <div className="space-y-3.5 mb-8 w-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      <strong className="text-[#242424]">Verified program reporting</strong> &mdash; Every progress milestone is verified with ground evidence
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      <strong className="text-[#242424]">Respectful community engagement</strong> &mdash; Programs designed in direct consultation with beneficiaries
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FB7336] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#242424] font-medium">
                      <strong className="text-[#242424]">Open volunteer participation</strong> &mdash; Ground and outreach opportunities with total operational transparency
                    </span>
                  </div>
                </div>

                {/* Explore Link */}
                <Link
                  to="/initiatives"
                  className="inline-flex items-center gap-1.5 font-bold text-sm sm:text-base text-[#FB7336] hover:text-[#242424] transition-colors duration-200"
                >
                  <span>Explore Our Initiatives</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* =========================================================================
            SECTION 5: Final Call to Action Banner (#FB7336 -> #FCC241 Gradient)
            ========================================================================= */}
        <section className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-center text-white">
          <Container size="default" className="relative z-10 text-center">
            {/* Bold Arial H2 */}
            <h2 className="font-['Arial',_Helvetica,_sans-serif] text-white font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight mb-3 max-w-3xl mx-auto">
              Together, We Can Make a Difference.
            </h2>

            {/* Concise Supporting Copy */}
            <p className="font-['Inter',_sans-serif] text-white/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Small actions can create meaningful change. Join ZINMATT Foundation in building a future where education, care, and civic environment are accessible to everyone.
            </p>

            {/* Action Button - Clean Single Line */}
            <div className="inline-flex justify-center">
              <Button
                as={Link}
                to="/get-involved"
                variant="white"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="rounded-xl shadow-lg hover:shadow-xl font-bold whitespace-nowrap px-8 py-3.5"
              >
                Join Our Mission
              </Button>
            </div>
          </Container>
        </section>
      </main>

      {/* 6. Global Footer */}
      <Footer />
    </div>
  );
}
