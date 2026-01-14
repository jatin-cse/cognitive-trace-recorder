import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function logEvent(
	context: vscode.ExtensionContext,
	event: any
) {
	try {
		const storageDir = context.globalStoragePath;
		const filePath = path.join(storageDir, 'cognitive-trace.json');

		// DEBUG: confirm path
		console.log('📁 Storage path:', filePath);

		// Ensure directory exists
		if (!fs.existsSync(storageDir)) {
			fs.mkdirSync(storageDir, { recursive: true });
		}

		let logs: any[] = [];

		if (fs.existsSync(filePath)) {
			const raw = fs.readFileSync(filePath, 'utf8');
			logs = raw ? JSON.parse(raw) : [];
		}

		logs.push({
			time: new Date().toISOString(),
			...event
		});

		fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), {
			encoding: 'utf8',
			flag: 'w'
		});

		console.log('✅ Event written to JSON');

	} catch (error) {
		console.error('❌ Failed to write JSON', error);
	}
}
