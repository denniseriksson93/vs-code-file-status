import * as vscode from 'vscode';
import { afOrderBy } from '../utilities/array-functions/af-order-by';

const jumpToFileStatus = (severity: vscode.DiagnosticSeverity) => {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  const allWithStatus = afOrderBy(
    vscode.languages
      .getDiagnostics(textEditor.document.uri)
      .filter((r) => r.severity === severity),
    (p) => p.range.start.line
  );

  const startLine = textEditor.selection.start.line;

  const statusToJumpTo =
    allWithStatus.find((aws) => aws.range.start.line > startLine) ??
    allWithStatus[0];

  textEditor.selection = new vscode.Selection(
    statusToJumpTo.range.start,
    statusToJumpTo.range.end
  );
  textEditor.revealRange(statusToJumpTo.range);
};

export const initJumpToFileStatus = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'vs-code-file-status.file-information',
      () => jumpToFileStatus(vscode.DiagnosticSeverity.Information)
    )
  );

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
