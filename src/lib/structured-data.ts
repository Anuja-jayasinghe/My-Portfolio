export function getPersonJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anuja Jayasinghe",
    url: siteUrl,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Anuja-jayasinghe",
      "https://linkedin.com/in/anuja-jayasinghe",
    ],
  };
}

export function getWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anuja Jayasinghe Portfolio",
    url: siteUrl,
  };
}
