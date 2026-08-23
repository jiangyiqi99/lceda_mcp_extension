import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import esbuild from 'esbuild';
import JSZip from 'jszip';

const buildDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.dirname(buildDirectory);
const distDirectory = path.join(rootDirectory, 'dist');

await fs.rm(distDirectory, { recursive: true, force: true });
await esbuild.build({
	entryPoints: { main: path.join(rootDirectory, 'src/main.ts') },
	outdir: distDirectory,
	bundle: true,
	minify: false,
	platform: 'browser',
	format: 'iife',
	globalName: 'edaEsbuildExportName',
	treeShaking: true,
	ignoreAnnotations: true,
});

if (process.argv.includes('--compile-only')) {
	process.exit(0);
}

const extensionConfig = JSON.parse(
	await fs.readFile(path.join(rootDirectory, 'extension.json'), 'utf8'),
);
const zip = new JSZip();
zip.file('extension.json', JSON.stringify(extensionConfig, null, '\t'));
zip.file('dist/main.js', await fs.readFile(path.join(distDirectory, 'main.js')));

const outputDirectory = path.join(buildDirectory, 'dist');
await fs.mkdir(outputDirectory, { recursive: true });
const outputPath = path.join(
	outputDirectory,
	`${extensionConfig.name}_v${extensionConfig.version}.eext`,
);
await fs.writeFile(outputPath, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log(`Built ${outputPath}`);

