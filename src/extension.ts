import * as vscode from 'vscode';
import { initJumpToFileStatus } from './business/jump-to-file-status';
import { initSetIconsVisibility } from './business/set-icons-visibility';

const disposables: vscode.Disposable[] = [];

export const activate = (context: vscode.ExtensionContext) => {
  disposables.push(...initSetIconsVisibility());
  initJumpToFileStatus(context);
};

export const deactivate = () => disposables.forEach((d) => d.dispose());
