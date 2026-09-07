import { serializeJsonLd } from "@/lib/site-config";

export interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Safely renders JSON-LD structured data with XSS character escaping.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export default StructuredData;
