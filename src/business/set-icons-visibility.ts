import * as vscode from 'vscode';

const setIconsVisibility = (textEditor: vscode.TextEditor | undefined) => {
  if (!textEditor) {
    return;
  }

  const diagnostics = vscode.languages.getDiagnostics(textEditor.document.uri);

  const hasInformationStatus = diagnostics.some(
    (r) => r.severity === vscode.DiagnosticSeverity.Information
  );
  vscode.commands.executeCommand(
    'setContext',
    'show-information',
    hasInformationStatus
  );

  const hasWarningStatus = diagnostics.some(
    (r) => r.severity === vscode.DiagnosticSeverity.Warning
  );
  vscode.commands.executeCommand(
    'setContext',
    'show-warning',
    hasWarningStatus
  );

  const hasErrorStatus = diagnostics.some(
    (r) => r.severity === vscode.DiagnosticSeverity.Error
  );
  vscode.commands.executeCommand('setContext', 'show-error', hasErrorStatus);
};

export const initSetIconsVisibility = () => {
  const onDidChangeDiagnostics = vscode.languages.onDidChangeDiagnostics(() =>
    setIconsVisibility(vscode.window.activeTextEditor)
  );
  const onDidChangeActiveTextEditor =
    vscode.window.onDidChangeActiveTextEditor(setIconsVisibility);

  return [onDidChangeDiagnostics, onDidChangeActiveTextEditor];
};
