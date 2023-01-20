import * as vscode from 'vscode';
import { ListUtilities } from './list-utilities';

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "vs-code-file-status" is now active!'
  );

  let fileWarning = vscode.commands.registerCommand(
    'vs-code-file-status.file-warning',
    () => {
      let diagnostics = vscode.languages.getDiagnostics();
      const allWarnings = diagnostics[1][1].filter(
        (r) => r.severity === vscode.DiagnosticSeverity.Warning
      );

      const firstRowWithWarnings = ListUtilities.minBy(
        allWarnings,
        (p) => p.range.start.line
      );

      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.selection = new vscode.Selection(
          firstRowWithWarnings.range.start,
          firstRowWithWarnings.range.end
        );
        editor.revealRange(firstRowWithWarnings.range);
      }

      allWarnings.forEach((w) => {
        vscode.window.showInformationMessage(JSON.stringify(w.message));
        vscode.window.showInformationMessage(JSON.stringify(w));
        vscode.window.showInformationMessage('Alexandra är bäst');
      });
    }
  );
  context.subscriptions.push(fileWarning);

  let fileError = vscode.commands.registerCommand(
    'vs-code-file-status.file-error',
    () => {
      vscode.window.showInformationMessage('file error');
    }
  );

  context.subscriptions.push(fileError);
}

// This method is called when your extension is deactivated
export function deactivate() {}
