import * as vscode from 'vscode';
import { logEvent } from './logger';

/**
 * Snapshot of comments per file
 */
let fileComments: Map<string, Set<string>> = new Map();

/**
 * Last known content of a line (for h → he → hel tracking)
 * key = file:lineNumber
 */
let lastLineContent: Map<string, string> = new Map();

/**
 * Hesitation timer
 */
let typingTimer: NodeJS.Timeout | undefined;

/**
 * Extract all single-line comments (//)
 */
function extractComments(text: string): Set<string> {
	const comments = new Set<string>();

	const lines = text.split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.startsWith('//')) {
			comments.add(trimmed);
		}
	}

	return comments;
}

export function activate(context: vscode.ExtensionContext) {
	console.log('🧠 Cognitive Trace Recorder activated');

	// 📂 FILE OPEN TRACKING
	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			logEvent(context, {
				type: 'file_open',
				file: editor.document.fileName
			});
		}
	});

	// ✍️ TEXT / COGNITION TRACKING
	vscode.workspace.onDidChangeTextDocument(event => {
		const document = event.document;
		const file = document.fileName;

		/* ===============================
		   COMMENT ADD / DELETE TRACKING
		================================ */

		const currentComments = extractComments(document.getText());
		const previousComments = fileComments.get(file) || new Set<string>();

		// ➕ Added comments
		for (const comment of currentComments) {
			if (!previousComments.has(comment)) {
				logEvent(context, {
					type: 'added_comment',
					file,
					comment
				});
			}
		}

		// ➖ Deleted comments
		for (const comment of previousComments) {
			if (!currentComments.has(comment)) {
				logEvent(context, {
					type: 'deleted_comment',
					file,
					comment
				});
			}
		}

		// Save snapshot
		fileComments.set(file, currentComments);

		/* ===============================
		   RAW LINE EVOLUTION (h → he → hel)
		================================ */

		const editor = vscode.window.activeTextEditor;
		if (editor && editor.document === document) {
			const position = editor.selection.active;
			const lineNumber = position.line;
			const lineText = document.lineAt(lineNumber).text;

			const key = `${file}:${lineNumber}`;
			const previousLine = lastLineContent.get(key);

			if (previousLine !== lineText) {
				logEvent(context, {
					type: 'line_evolution',
					file,
					line: lineNumber,
					content: lineText
				});

				lastLineContent.set(key, lineText);
			}
		}

		/* ===============================
		   HESITATION DETECTION
		================================ */

		if (typingTimer) {
			clearTimeout(typingTimer);
		}

		typingTimer = setTimeout(() => {
			logEvent(context, {
				type: 'hesitation',
				duration: 3000
			});
		}, 3000);
	});
}

export function deactivate() {}
