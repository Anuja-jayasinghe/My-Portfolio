import { describe, it, expect } from "vitest";
import { getPersonJsonLd, getWebsiteJsonLd } from "./structured-data";

describe("getPersonJsonLd", () => {
  it("returns a schema.org Person with the given site URL", () => {
    const result = getPersonJsonLd("https://anujajay.com");
    expect(result["@type"]).toBe("Person");
    expect(result.url).toBe("https://anujajay.com");
  });
});

describe("getWebsiteJsonLd", () => {
  it("returns a schema.org WebSite with the given site URL", () => {
    const result = getWebsiteJsonLd("https://anujajay.com");
    expect(result["@type"]).toBe("WebSite");
    expect(result.url).toBe("https://anujajay.com");
  });
});
