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
              Free, open-source tools to help people find substance use care.
              Powered by SAMHSA data.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/screen" className="text-warm-500 hover:text-warm-700">
                  Screening Tools
                </Link>
              </li>
              <li>
                <Link href="/providers" className="text-warm-500 hover:text-warm-700">
                  Find Providers
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-warm-500 hover:text-warm-700">
                  Educational Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Crisis Support</h3>
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
            This tool is for informational purposes only and is not a substitute for
            professional medical advice, diagnosis, or treatment. If you are in
            crisis, please call 988 or go to your nearest emergency room.
          </p>
          <p className="text-xs text-warm-400 text-center mt-2">
            Data sourced from SAMHSA&apos;s FindTreatment.gov. This is an open-source project.
          </p>
        </div>
      </div>
    </footer>
  );
}
