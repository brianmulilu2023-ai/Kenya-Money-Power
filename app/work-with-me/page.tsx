import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function WorkWithMePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <SectionHeader title="Work With Me" description="Consulting, advisory, and speaking for leaders who want to translate data into influence." />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-8 rounded-[2rem] border border-slate-200/10 bg-white/95 p-8 shadow-gold sm:p-10">
          <div className="space-y-4 text-slate-700">
            <p className="text-lg leading-8">
              Kenya Money & Power helps senior teams use economic intelligence, market analysis, and political insight to shape strategy and drive results.
            </p>
            <p className="text-lg leading-8">
              Whether you're building an investment thesis, designing policy communication, or mapping risk across sectors, the work is grounded in evidence, urgency, and clarity.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Services</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Market strategy and policy intelligence</li>
                <li>Data-driven political risk reports</li>
                <li>Executive briefings and scenario planning</li>
                <li>Media and stakeholder communication support</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Who this is for</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Portfolio managers and investors</li>
                <li>Political strategists and think tanks</li>
                <li>Corporate risk and strategy teams</li>
                <li>Journalists and research directors</li>
              </ul>
            </div>
          </div>
        </section>
        <aside className="rounded-[2rem] border border-slate-200/10 bg-slate-950/95 p-8 text-white shadow-gold sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold">Start your next campaign.</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Reach out with the opportunity, timeline and audience you care about, and we will build a focused brief to move your project forward.
          </p>
          <div className="mt-8 space-y-4 text-slate-100">
            <p>
              Email: <Link href="mailto:hello@kenyamoneyandpower.com" className="text-gold hover:text-white">hello@kenyamoneyandpower.com</Link>
            </p>
            <p>
              WhatsApp: <Link href="https://wa.me/254700000000" className="text-gold hover:text-white">+254 700 000 000</Link>
            </p>
          </div>
          <div className="mt-8 rounded-3xl bg-white/5 p-6">
            <h3 className="text-sm uppercase tracking-[0.35em] text-gold">Brief form</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Share your goal, your timeline and what you need most. Email or WhatsApp works best.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
