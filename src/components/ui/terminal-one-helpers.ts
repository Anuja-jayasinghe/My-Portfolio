export function getGithubBannerUrl(repoUrl: string): string | null {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return null;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}
