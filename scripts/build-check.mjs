import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pages = [
  { path: "index.html", title: "FANNA | Media Intelligence & Creative Technology Platform" },
  { path: "privacy-policy/index.html", title: "Privacy Policy | FANNA" },
  { path: "terms/index.html", title: "Terms of Service | FANNA" },
  { path: "data-deletion/index.html", title: "Data Deletion Instructions | FANNA" }
];

for (const page of pages) {
  const file = join(root, page.path);
  if (!existsSync(file)) {
    throw new Error(`Missing page: ${page.path}`);
  }

  const html = readFileSync(file, "utf8");
  if (!html.includes(`<title>${page.title}</title>`)) {
    throw new Error(`Missing expected title in ${page.path}`);
  }
  if (!html.includes('name="description"')) {
    throw new Error(`Missing meta description in ${page.path}`);
  }
  if (!html.includes("support@mantradigi.com")) {
    throw new Error(`Missing contact email in ${page.path}`);
  }
}

console.log("Build check passed. Static compliance pages are ready.");
