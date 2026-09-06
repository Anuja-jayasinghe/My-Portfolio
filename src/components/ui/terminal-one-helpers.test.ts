import { describe, it, expect } from "vitest";
import { getGithubBannerUrl } from "./terminal-one-helpers";

describe("getGithubBannerUrl", () => {
  it("builds an opengraph.githubassets.com URL from a github.com repo URL", () => {
    expect(getGithubBannerUrl("https://github.com/Anuja-jayasinghe/HangMan")).toBe(
      "https://opengraph.githubassets.com/1/Anuja-jayasinghe/HangMan"
    );
  });

  it("returns null for a non-github URL", () => {
    expect(getGithubBannerUrl("https://gitlab.com/foo/bar")).toBeNull();
  });

  it("returns null for a malformed github URL with no repo segment", () => {
    expect(getGithubBannerUrl("https://github.com/foo")).toBeNull();
  });
});
