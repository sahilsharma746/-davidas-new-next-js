// Renders a JSON-LD <script> block. Server component (no interactivity).
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (our own data, no user input at build time).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
