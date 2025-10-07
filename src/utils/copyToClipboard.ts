export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

export function formatCopyText(
  verse: string,
  reference: string,
  content: string
): string {
  return `Pray with us! https://pray-to-gather.base44.app\n\n${reference}\n${verse}\n\n${content}`;
}
