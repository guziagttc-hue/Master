export interface Shortcut {
  key: string;
  action: string;
  category: 'Basic' | 'Formatting' | 'Editing' | 'File';
  description?: string;
}

export const EXCEL_SHORTCUTS: Shortcut[] = [
  { key: 'Ctrl + A', action: 'Select All', category: 'Editing', description: 'Selects all content in the current range or worksheet.' },
  { key: 'Ctrl + B', action: 'Bold', category: 'Formatting', description: 'Applies or removes bold formatting to the selected text.' },
  { key: 'Ctrl + C', action: 'Copy', category: 'Editing', description: 'Copies the selected cells to the clipboard.' },
  { key: 'Ctrl + D', action: 'Fill Down', category: 'Editing', description: 'Copies the content and format of the topmost cell of a selected range into the cells below.' },
  { key: 'Ctrl + F', action: 'Find', category: 'Basic', description: 'Opens the Find and Replace dialog box with the Find tab selected.' },
  { key: 'Ctrl + G', action: 'Go To', category: 'Basic', description: 'Opens the Go To dialog box.' },
  { key: 'Ctrl + H', action: 'Replace', category: 'Basic', description: 'Opens the Find and Replace dialog box with the Replace tab selected.' },
  { key: 'Ctrl + I', action: 'Italic', category: 'Formatting', description: 'Applies or removes italic formatting to the selected text.' },
  { key: 'Ctrl + K', action: 'Insert Hyperlink', category: 'Editing', description: 'Opens the Insert Hyperlink dialog box for new hyperlinks or the Edit Hyperlink dialog box for existing ones.' },
  { key: 'Ctrl + N', action: 'New Workbook', category: 'File', description: 'Creates a new, blank workbook.' },
  { key: 'Ctrl + O', action: 'Open File', category: 'File', description: 'Opens the Open dialog box to open or find a file.' },
  { key: 'Ctrl + P', action: 'Print', category: 'File', description: 'Opens the Print tab in Backstage view.' },
  { key: 'Ctrl + R', action: 'Fill Right', category: 'Editing', description: 'Copies the content and format of the leftmost cell of a selected range into the cells to the right.' },
  { key: 'Ctrl + S', action: 'Save Workbook', category: 'File', description: 'Saves the active workbook.' },
  { key: 'Ctrl + T', action: 'Create Table', category: 'Basic', description: 'Opens the Create Table dialog box.' },
  { key: 'Ctrl + U', action: 'Underline', category: 'Formatting', description: 'Applies or removes underlining to the selected text.' },
  { key: 'Ctrl + V', action: 'Paste', category: 'Editing', description: 'Inserts the contents of the clipboard at the insertion point.' },
  { key: 'Ctrl + W', action: 'Close Window', category: 'File', description: 'Closes the selected workbook window.' },
  { key: 'Ctrl + X', action: 'Cut', category: 'Editing', description: 'Removes the selected cells and puts them on the clipboard.' },
  { key: 'Ctrl + Y', action: 'Repeat', category: 'Basic', description: 'Repeats the last command or action, if possible.' },
  { key: 'Ctrl + Z', action: 'Undo', category: 'Basic', description: 'Reverses the last command or action.' },
];
