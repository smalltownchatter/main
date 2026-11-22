/**
 * ─────────────────────────────────────────────────────────────
 *  FAQs — the questions and answers live in src/editable/faqs.json,
 *  which can be edited in the dashboard at /admin/.
 *  Answers support **bold** and [link text](/page/) only.
 *  Note: prices written in answers are plain text. If a package
 *  price changes, update the FAQ answer too.
 * ─────────────────────────────────────────────────────────────
 */
import data from '../editable/faqs.json';

export interface Faq {
  q: string;
  a: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Turns the tiny bit of formatting allowed in the editor into HTML. */
export function formatAnswer(text: string): string {
  return esc(text.trim())
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(((?:\/|https?:\/\/|mailto:)[^)\s]*)\)/g, '<a href="$2">$1</a>');
}

const toFaqs = (list: { question: string; answer: string }[] = []): Faq[] =>
  list.filter((f) => f.question && f.answer).map((f) => ({ q: f.question.trim(), a: formatAnswer(f.answer) }));

export const websiteFaqs: Faq[] = toFaqs(data.websiteFaqs);
export const photographyFaqs: Faq[] = toFaqs(data.photographyFaqs);
