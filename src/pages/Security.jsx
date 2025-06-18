import { Shield, Phone } from 'lucide-react';
import Sidebar from '../components/reusables/Sideba';

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-full md:max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield size={28} className="text-blue-400" />
            Device & Data Security Tips
          </h1>
          <p className="mt-2 text-slate-300">
            We care about your data and device security. Here are some steps you can take to protect yourself.
          </p>
        </header>

        {/* Security Tips Section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">Device Security Tips</h2>
          <ul className="space-y-4 list-disc pl-6 text-slate-200">
            <li>Always lock your phone with a strong PIN or biometric authentication.</li>
            <li>Enable remote tracking and wiping features like "Find My Device".</li>
            <li>Regularly update your OS and apps to patch vulnerabilities.</li>
            <li>Avoid connecting to unknown Wi-Fi networks in public places.</li>
            <li>Install a trusted antivirus app and keep it updated.</li>
            <li>Use two-factor authentication (2FA) wherever possible.</li>
          </ul>
        </section>

        {/* Call Center Numbers Section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-purple-500 pl-3 flex items-center gap-2">
            <Phone /> Emergency Contacts (Nigeria)
          </h2>

          {/* Network Providers */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2 text-purple-300">Network Providers (SIM Blocking)</h3>
            <ul className="space-y-2 text-slate-200">
              <li><strong>Mtn Nigeria:</strong> 07029000000 / 08030000000</li>
              <li><strong>Airtel Nigeria:</strong> 121 / 08020000000</li>
              <li><strong>Glo Nigeria:</strong> 124 / 08050000000</li>
              <li><strong>9mobile:</strong> 200 / 08090000000</li>
            </ul>
          </div>

          {/* Banks */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-purple-300">Banks (Account Blocking)</h3>
            <ul className="space-y-2 text-slate-200">
              <li><strong>GTBank:</strong> 07000282828</li>
              <li><strong>Zenith Bank:</strong> 07000933933</li>
              <li><strong>FirstBank:</strong> 07003000000</li>
              <li><strong>UBA:</strong> 07008227384</li>
              <li><strong>Diamond Bank:</strong> 07009000000</li>
              <li><strong>Access Bank:</strong> 07002255225</li>
              <li><strong>Ecobank:</strong> 07004455000</li>
            </ul>
          </div>
        </section>

        {/* Final Message */}
        <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-xl p-6 text-center">
          <p className="text-slate-200">
            Your safety matters to us. If you ever lose your phone or suspect any breach, act quickly and contact the relevant authorities.
          </p>
        </section>
      </main>
    </div>
  );
}