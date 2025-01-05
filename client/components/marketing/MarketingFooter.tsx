'use client';

import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Berkat Farm</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://github.com/aimanasrn"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Aiman Asraf
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/aimanasrn/berkat-farm"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/privacy"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
} 