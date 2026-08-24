import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const declarationsPath = path.join(root, 'node_modules/@jlceda/pro-api-types/index.d.ts');
const outputPath = path.join(root, 'src/generated/api-catalog.ts');
const text = await fs.readFile(declarationsPath, 'utf8');
const source = ts.createSourceFile(
	declarationsPath,
	text,
	ts.ScriptTarget.Latest,
	true,
);
const classes = new Map();

function collectClasses(node) {
	if (ts.isClassDeclaration(node) && node.name) classes.set(node.name.text, node);
	ts.forEachChild(node, collectClasses);
}
collectClasses(source);

const eda = classes.get('EDA');
if (!eda) throw new Error('Official EDA class was not found');
const catalog = {};
const typeCatalog = {};
for (const member of eda.members) {
	if (!ts.isPropertyDeclaration(member) || !member.name || !member.type) continue;
	const api = member.name.getText(source);
	if (!api.includes('_')) continue;
	const declaration = classes.get(member.type.getText(source));
	if (!declaration) continue;
	const methods = {};
	for (const method of declaration.members.filter(ts.isMethodDeclaration)) {
		const name = method.name.getText(source);
		const parameters = method.parameters.map(parameter => parameter.getText(source)).join(', ');
		const returns = method.type?.getText(source) ?? 'unknown';
		const signature = `${name}(${parameters}): ${returns}`.replace(/\s+/g, ' ');
		(methods[name] ??= []).push(signature);
	}
	catalog[api] = methods;
}

function collectTypes(node) {
	if ((ts.isEnumDeclaration(node) || ts.isInterfaceDeclaration(node)
		|| ts.isTypeAliasDeclaration(node)) && node.name) {
		const name = node.name.text;
		const declaration = node.getText(source).replace(/\s+/g, ' ');
		(typeCatalog[name] ??= []).push(declaration);
	}
	ts.forEachChild(node, collectTypes);
}
collectTypes(source);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(
	outputPath,
	`// Generated from @jlceda/pro-api-types. Do not edit by hand.\n`
		+ `export const API_CATALOG = ${JSON.stringify(catalog, null, '\t')} as const;\n`
		+ `export const API_TYPE_CATALOG = ${JSON.stringify(typeCatalog, null, '\t')} as const;\n`,
	'utf8',
);
console.log(`Generated ${path.relative(root, outputPath)}`);
