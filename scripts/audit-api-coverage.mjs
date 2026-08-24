import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const declarationsPath = path.join(root, 'node_modules/@jlceda/pro-api-types/index.d.ts');
const bridgePath = path.join(root, 'src/commands/raw-api.ts');
const catalogPath = path.join(root, 'src/generated/api-catalog.ts');
const source = ts.createSourceFile(
	declarationsPath,
	fs.readFileSync(declarationsPath, 'utf8'),
	ts.ScriptTarget.Latest,
	true,
);
const bridge = fs.readFileSync(bridgePath, 'utf8');
const generatedCatalog = fs.readFileSync(catalogPath, 'utf8');
const scopeByPrefix = new Map([
	['dmt', 'project'],
	['lib', 'library'],
	['pnl', 'panel'],
	['pcb', 'pcb'],
	['sch', 'schematic'],
	['sys', 'system'],
]);
const blocked = new Set(['sys_ClientUrl', 'sys_FileSystem', 'sys_WebSocket']);
const classes = new Map();

function collectClasses(node) {
	if (ts.isClassDeclaration(node) && node.name) classes.set(node.name.text, node);
	ts.forEachChild(node, collectClasses);
}
collectClasses(source);

const eda = classes.get('EDA');
if (!eda) throw new Error('Official EDA class was not found');

const namespaces = [];
for (const member of eda.members) {
	if (!ts.isPropertyDeclaration(member) || !member.name || !member.type) continue;
	const api = member.name.getText(source);
	if (api === 'extensionUuid') continue;
	const prefix = api.split('_', 1)[0];
	const scope = scopeByPrefix.get(prefix);
	if (!scope) throw new Error(`Unmapped official API namespace prefix: ${api}`);
	const expectedMapping = `${scope}: ['${prefix}_']`;
	if (!bridge.includes(expectedMapping)) {
		throw new Error(`raw-api.ts does not map ${api} to scope ${scope}`);
	}
	if (!generatedCatalog.includes(`\"${api}\":`)) {
		throw new Error(`Generated signature catalog does not include ${api}`);
	}
	const declaration = classes.get(member.type.getText(source));
	if (!declaration) throw new Error(`Class declaration missing for ${api}`);
	const methods = declaration.members.filter(ts.isMethodDeclaration);
	namespaces.push({ api, scope, methods: methods.length, blocked: blocked.has(api) });
}

for (const api of blocked) {
	if (!bridge.includes(`'${api}'`)) throw new Error(`Blocked namespace is not explicit: ${api}`);
}
for (const requiredTransport of [
	'callRawEdaApi',
	'callRawPrimitive',
	'describeRawEdaType',
	'exportRawEdaFile',
	'exportRawPrimitiveFile',
	'subscribeRawEdaEvent',
	'decodeRawArgs',
]) {
	if (!bridge.includes(requiredTransport)) {
		throw new Error(`Required API transport is missing: ${requiredTransport}`);
	}
}

const exposed = namespaces.filter(item => !item.blocked);
const methodCount = exposed.reduce((total, item) => total + item.methods, 0);
const byScope = Object.fromEntries(
	[...new Set(exposed.map(item => item.scope))].sort().map(scope => [
		scope,
		exposed.filter(item => item.scope === scope).length,
	]),
);
console.log(JSON.stringify({
	types_version: JSON.parse(fs.readFileSync(
		path.join(root, 'node_modules/@jlceda/pro-api-types/package.json'),
		'utf8',
	)).version,
	official_namespaces: namespaces.length,
	exposed_namespaces: exposed.length,
	explicitly_blocked_namespaces: [...blocked].sort(),
	method_overloads_exposed: methodCount,
	namespaces_by_scope: byScope,
}, null, 2));
