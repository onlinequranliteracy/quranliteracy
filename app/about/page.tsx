export default function AboutPage() {
  return (
    <main className="px-6 md:px-16 py-20">
      <h1 className="text-4xl font-bold text-green-700 text-center">
        About Quran Literacy Academy
      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
        Quran Literacy Academy provides structured and personalized Qur’an 
        learning programs for children and adults. Our qualified female teacher 
        offers one-on-one and group lessons with flexible timing to suit your 
        schedule.
      </p>

      <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
        We focus on pronunciation (Tajweed), reading fluency, memorization 
        (Hifz), daily dua, and Islamic etiquettes — helping each learner grow at 
        their own pace in a supportive environment.
      </p>

      <h2 className="text-2xl font-bold text-green-700 mt-12 text-center">
        Why Choose Us?
      </h2>

      <ul className="max-w-3xl mx-auto mt-4 list-disc pl-6 text-gray-700 space-y-2">
        <li>Qualified female Qur’an teacher</li>
        <li>Flexible class schedules (UK-friendly)</li>
        <li>Affordable monthly pricing</li>
        <li>Structured lesson plans tailored to your level</li>
        <li>Beginner-friendly — kids & adults welcome</li>
      </ul>
    </main>
  );
}
