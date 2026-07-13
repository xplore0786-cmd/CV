export function formatDate(dateString: string): string {
  if (!dateString) return 'Present';
  // simple formatting, assuming YYYY-MM
  const parts = dateString.split('-');
  if (parts.length >= 2) {
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return dateString;
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback for older environments
  return Math.random().toString(36).substring(2, 15);
}
