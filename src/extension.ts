import * as vscode from 'vscode';
import { ListUtilities } from './list-utilities';

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('vs-code-file-status.file-warning', () =>
      jumpToFileStatus(vscode.DiagnosticSeverity.Warning)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-code-file-status.file-error', () =>
      jumpToFileStatus(vscode.DiagnosticSeverity.Error)
    )
  );
};

const jumpToFileStatus = (severity: vscode.DiagnosticSeverity) => {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  const allWithStatus = vscode.languages
    .getDiagnostics()[1][1]
    .filter((r) => r.severity === severity);

  const firstRowWithStatus = ListUtilities.minBy(
    allWithStatus,
    (p) => p.range.start.line
  );

  textEditor.selection = new vscode.Selection(
    firstRowWithStatus.range.start,
    firstRowWithStatus.range.end
  );
  textEditor.revealRange(firstRowWithStatus.range);

  allWithStatus.forEach((w) => {
    vscode.window.showInformationMessage(JSON.stringify(w.message));
  });
};

export const deactivate = () => {};
