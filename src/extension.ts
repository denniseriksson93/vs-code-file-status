import * as vscode from 'vscode';
import { ListUtilities } from './list-utilities';

export const activate = (context: vscode.ExtensionContext) => {
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

const jumpToFileStatus = (severity: vscode.DiagnosticSeverity) => {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  vscode.commands.executeCommand('setContext', 'show-information', true);

  const startLine = textEditor.selection.start.line;

  const allWithStatus = ListUtilities.orderBy(
    vscode.languages
      .getDiagnostics()[1][1]
      .filter((r) => r.severity === severity),
    (p) => p.range.start.line
  );

  const statusToJumpTo =
    allWithStatus.find((aws) => aws.range.start.line > startLine) ??
    allWithStatus[0];

  textEditor.selection = new vscode.Selection(
    statusToJumpTo.range.start,
    statusToJumpTo.range.end
  );
  textEditor.revealRange(statusToJumpTo.range);

  if (severity === vscode.DiagnosticSeverity.Information) {
    vscode.window.showInformationMessage(statusToJumpTo.message);
    return;
  }

  if (severity === vscode.DiagnosticSeverity.Warning) {
    vscode.window.showWarningMessage(statusToJumpTo.message);
    return;
  }

  if (severity === vscode.DiagnosticSeverity.Error) {
    vscode.window.showErrorMessage(statusToJumpTo.message);
    return;
  }
};

export const deactivate = () => {};
