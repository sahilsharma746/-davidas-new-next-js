import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))' }}>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">404</span>
          <h1 className="section__title">Page Not Found</h1>
          <p className="section__desc">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
          <Link href="/" className="btn btn--primary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
