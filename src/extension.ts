import * as vscode from 'vscode';
import { initJumpToFileStatus } from './business/jump-to-file-status';
import { initSetIconsVisibility } from './business/set-icons-visibility';

export const activate = (context: vscode.ExtensionContext) => {
  initSetIconsVisibility();
  initJumpToFileStatus(context);
};

export const deactivate = () => {};
