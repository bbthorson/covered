import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary-700">
              <Heart className="h-5 w-5 fill-primary-500 text-primary-500" aria-hidden="true" />
              Covered
            </Link>
            <p className="mt-2 text-sm text-warm-500">
              We&apos;ve got you. Free tools to check in, find care, and learn —
              no sign-up, no judgment.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/screen" className="text-warm-500 hover:text-warm-700">
                  Check In
                </Link>
              </li>
              <li>
                <Link href="/providers" className="text-warm-500 hover:text-warm-700">
                  Find Care
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-warm-500 hover:text-warm-700">
                  Learn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Need to Talk?</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:988" className="text-warm-500 hover:text-warm-700">
                  988 Suicide &amp; Crisis Lifeline
                </a>
              </li>
              <li>
                <a href="tel:1-800-662-4357" className="text-warm-500 hover:text-warm-700">
                  SAMHSA Helpline: 1-800-662-4357
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-warm-200">
          <p className="text-xs text-warm-400 text-center">
            Covered is here to inform and support — not to replace professional
            medical advice. If you need to talk to someone right now, call 988.
          </p>
          <p className="text-xs text-warm-400 text-center mt-2">
            Provider data from SAMHSA&apos;s FindTreatment.gov. Open-source and always free.
          </p>
        </div>
      </div>
    </footer>
  );
}
