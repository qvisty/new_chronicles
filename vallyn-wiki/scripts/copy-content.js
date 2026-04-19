/**
 * Copies all .md files from the parent Ralle Rollespil directory
 * into src/content/wiki/ before the Astro build.
 * Preserves directory structure.
 */
import { readdirSync, statSync, copyFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const sourceRoot = join(projectRoot, '..'); // Ralle Rollespil/
const destRoot = join(projectRoot, 'src', 'content', 'wiki');

// Directories to exclude
const EXCLUDE = new Set([
  'vallyn-wiki',
  'node_modules',
  '.git',
  'dist',
  '.astro',
]);

// Clean previous content
if (existsSync(destRoot)) {
  rmSync(destRoot, { recursive: true });
}
mkdirSync(destRoot, { recursive: true });

let copied = 0;

/**
 * Sanitize a path segment so Vite/Rollup can import it safely.
 * Replaces characters that break URL parsing or Windows paths.
 */
function sanitize(name) {
  return name
    .replace(/#/g, '-')    // # breaks URL fragment parsing
    .replace(/:/g, '-')    // : invalid on Windows paths and URLs
    .replace(/\?/g, '-')   // ? breaks URL query parsing
    .replace(/\*/g, '-')   // * invalid on Windows
    .replace(/\|/g, '-')   // | invalid on Windows
    .replace(/</g, '-')    // < invalid on Windows
    .replace(/>/g, '-')    // > invalid on Windows
    .replace(/"/g, '-')    // " invalid on Windows
    .replace(/\\/g, '-')   // backslash
    .replace(/\s+_\s+/g, ' - ') // " _ " -> " - " for readability
    .replace(/ {2,}/g, ' ')     // collapse multiple spaces
    .trim();
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE.has(entry.name)) {
        walk(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const rel = relative(sourceRoot, fullPath);
      // Sanitize each path segment individually
      const sanitizedRel = rel.split(/[\\/]/).map(sanitize).join('/');
      const dest = join(destRoot, sanitizedRel);
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(fullPath, dest);
      copied++;
    }
  }
}

console.log(`Copying markdown files from ${sourceRoot} -> ${destRoot}`);
walk(sourceRoot);
console.log(`Copied ${copied} markdown files.`);
