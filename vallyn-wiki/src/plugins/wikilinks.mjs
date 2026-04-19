/**
 * Remark plugin: [[WikiLink]] og [[WikiLink|Alias]] support.
 *
 * Transformer [[Page Name]] i markdown-tekst til interne links.
 * Matcher sidenavne (filnavn uden .md) case-insensitivt mod
 * alle sider i src/content/wiki/.
 *
 * Bruges i astro.config.mjs under markdown.remarkPlugins.
 */

import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';

/**
 * Bygger en map: lowercase_navn -> url-slug (relativ sti uden .md)
 */
function buildSlugMap(contentDir) {
  const map = new Map();

  function scan(dir, parts) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name), [...parts, entry.name]);
      } else if (entry.name.endsWith('.md')) {
        const name = entry.name.replace(/\.md$/, '');
        const slug = [...parts, name].join('/');
        // Gem baade det fulde slug og kun filnavnet som noeoegel
        map.set(name.toLowerCase(), slug);
      }
    }
  }

  scan(contentDir, []);
  return map;
}

/**
 * Laver en URL-sti fra en slug: enkoderer hvert segment.
 */
function slugToHref(base, slug) {
  const segments = slug.split('/').map(encodeURIComponent);
  return `${base}/wiki/${segments.join('/')}`;
}

/**
 * Returnerer Remark-plugin-funktionen.
 *
 * @param {object} options
 * @param {string} options.base   - BASE_URL fra Astro (f.eks. '/new_chronicles')
 * @param {string} options.contentDir - absolut sti til src/content/wiki/
 */
export function remarkWikiLinks({ base = '', contentDir } = {}) {
  const dir = contentDir || path.resolve(process.cwd(), 'src/content/wiki');
  const slugMap = buildSlugMap(dir);

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !Array.isArray(parent.children)) return;

      const WIKILINK = /\[\[([^\]]+)\]\]/g;
      let match;
      const newNodes = [];
      let lastIndex = 0;

      while ((match = WIKILINK.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          newNodes.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
        }

        const inner = match[1];
        const [rawName, rawAlias] = inner.split('|').map((s) => s.trim());
        const displayText = rawAlias || rawName;
        const lookupKey = rawName.toLowerCase();
        const slug = slugMap.get(lookupKey);

        if (slug) {
          newNodes.push({
            type: 'link',
            url: slugToHref(base, slug),
            title: rawName,
            children: [{ type: 'text', value: displayText }],
          });
        } else {
          // Ukendt side — vis som tekst med markering
          newNodes.push({
            type: 'html',
            value: `<span class="wiki-missing" title="Siden '${rawName}' findes ikke endnu">${displayText}</span>`,
          });
        }

        lastIndex = match.index + match[0].length;
      }

      if (newNodes.length === 0) return; // Ingen wiki-links i denne node

      if (lastIndex < node.value.length) {
        newNodes.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...newNodes);
    });
  };
}
