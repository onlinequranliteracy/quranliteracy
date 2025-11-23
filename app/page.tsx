import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      
      {/* HERO SECTION */}
      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-green-700">
            Learn Qur’an Online with A Qualified Female Teacher
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Personalized Qur’an tutoring for kids & adults. Group or 1-on-1 classes. 
            Available worldwide with UK-friendly schedules.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

  {/* Book Consultation */}
  <Link href="/consultation">
    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg">
      Book Free Consultation
    </Button>
  </Link>

  {/* Enroll Now */}
  <Link href="/enroll">
    <Button className="bg-white text-green-700 border border-green-700 hover:bg-green-50 px-6 py-3 text-lg">
      Enroll Now
    </Button>
  </Link>

</div>

        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/hero.png"  // Replace with your hero image inside /public
            width={420}
            height={420}
            alt="Quran Learning"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      

      {/* COURSES */}
      <section className="px-6 md:px-16 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-green-700">Our Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          {[
            "Qaaidatu Nooraniya",
            "Tajweed",
            "Hifz (Memorization)",
            "Salah Training",
            "Dua & Daily Adhkar",
            "Reading & Correction"
          ].map((course) => (
            <div 
              key={course}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-700">{course}</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Learn {course} with structured lessons and patient guidance.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* PRICING */}
<section className="px-6 md:px-16 py-16">
  <h2 className="text-3xl font-bold text-center text-green-700">
    Affordable Monthly Pricing
  </h2>
  <p className="text-center text-gray-500 mt-2">
    Pay in Pounds (£) — processed securely via Paystack
  </p>

  {/* Pricing Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

    {/* GROUP */}
    <div className="border p-8 rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-2xl font-bold text-green-700">Group Class</h3>
      <p className="text-gray-500 mt-1">(Max 4 students)</p>

      <p className="text-5xl font-bold mt-4">£5 
        <span className="text-lg font-normal text-gray-500"> / lesson</span>
      </p>

      <p className="text-gray-600 mt-4">
        Billed monthly • Choose 1–5 days per week
      </p>

      <Link href="/enroll">
        <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3">
          Enroll Now
        </Button>
      </Link>
    </div>

    {/* ONE-ON-ONE */}
    <div className="border p-8 rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-2xl font-bold text-green-700">One-on-One</h3>

      <p className="text-5xl font-bold mt-4">£10 
        <span className="text-lg font-normal text-gray-500"> / lesson</span>
      </p>

      <p className="text-gray-600 mt-4">
        Fully personal learning • Flexible timing
      </p>

      <Link href="/enroll">
        <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3">
          Enroll Now
        </Button>
      </Link>
    </div>

  </div>

  {/* Centered View Pricing Button */}
  <div className="w-full flex justify-center mt-10">
    <Link href="/pricing">
      <Button className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white text-lg">
        View Pricing
      </Button>
    </Link>
  </div>

</section>


      {/* WHY CHOOSE US */}
      <section className="px-6 md:px-16 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-green-700">Why Students Love Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold text-green-700">Experienced Teachers</h4>
            <p className="text-gray-600 mt-2">Qualified tutors with years of Qur’an teaching experience.</p>
          </div>

          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold text-green-700">Flexible Timings</h4>
            <p className="text-gray-600 mt-2">UK-friendly schedules — weekdays, evenings & weekends.</p>
          </div>

          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold text-green-700">Simple Enrollment</h4>
            <p className="text-gray-600 mt-2">Pay monthly & start immediately — free consultation included.</p>
          </div>

        </div>
      </section>


                      {/* TESTIMONIALS */}
<section className="px-6 md:px-16 py-20 bg-white">
  <h2 className="text-3xl font-bold text-center text-green-700">
    What Our Students & Parents Say
  </h2>

  <p className="text-center text-gray-500 mt-2">
    Real feedback from learners around the world
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

    {/* Testimonial 1 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “My daughter looks forward to every class. She reads short surahs confidently now.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Amina, UK</p>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “As an adult beginner, I was nervous. But the teacher made me feel completely comfortable.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Sara, Canada</p>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “I memorised more in 3 months than I did in a year. Her method works so well.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Huda, UK</p>
    </div>

    {/* Testimonial 4 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “Best decision we made for our kids. The lessons are structured and effective.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Farhan, Birmingham</p>
    </div>

    {/* Testimonial 5 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “Her tajweed corrections are so helpful. My recitation is much clearer now.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Maryam, Ghana</p>
    </div>

    {/* Testimonial 6 */}
    <div className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-gray-700 italic">
        “Flexible, friendly, and very motivating. I’m memorising Qur’an steadily now.”
      </p>
      <p className="text-green-700 font-semibold mt-4">— Khadijah, USA</p>
    </div>

  </div>
</section>



      {/* CTA */}
      <section className="px-6 md:px-16 py-20 text-center">
        <h2 className="text-3xl font-bold text-green-700">Ready to Start Your Qur’an Journey?</h2>
        <p className="text-gray-600 mt-3">Book a free consultation — no commitment required.</p>

        <Link href="/consultation">
          <Button className="mt-6 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg">
            Book Consultation
          </Button>
        </Link>

</section>
    </main>
  );
}
