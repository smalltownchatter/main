/**
 * ─────────────────────────────────────────────────────────────
 *  FAQs — edit questions and answers here.
 *  Answers can use simple HTML (<a href="…">, <strong>).
 *  Prices are pulled from packages.ts so they never drift.
 * ─────────────────────────────────────────────────────────────
 */
import { pkg, money } from './packages';
import { site } from './site';

const little = pkg('little-local');
const main = pkg('main-street');

/** Communities listed in the photography "where" answer. */
const photoTowns =
  "Carp, Almonte, Arnprior, Renfrew, Calabogie, Pembroke, Petawawa, Killaloe, Combermere, Barry's Bay and Shawville";

export interface Faq {
  q: string;
  a: string;
}

export const websiteFaqs: Faq[] = [
  {
    q: 'Do I really need a website if I already have Facebook?',
    a: `Facebook is a great place to chat with customers, and I'd never tell you to give it up. But not everyone uses it, posts get buried quickly, and you don't control how it looks or works. A website is your own home base. It shows up when people search for you, it keeps your hours, services and contact details in one easy place, and it looks the same whether someone's on Facebook or not. Think of it as the storefront, and social media as the friendly chatter out front.`,
  },
  {
    q: "I'm a really small business. Is a website worth it?",
    a: `Honestly? Small businesses are exactly who I built ${site.name} for. When someone hears about you from a neighbour, the next thing they usually do is look you up. A simple, professional website helps them find you, understand what you offer and get in touch. That's why <a href="/websites/#pricing">${little.name}</a> exists: one polished page, without a big-city price tag.`,
  },
  {
    q: 'How much does a website cost?',
    a: `${little.name} (a one-page website) is <strong>${money(little.price)} all-in</strong>, and ${main.name} (up to five pages) is <strong>${money(main.price)} all-in</strong>. Both include design, copywriting, licensed stock photography, launch setup and applicable tax. If you need something more custom, I'll put together a quote for you before any work starts. You can see everything that's included on the <a href="/websites/#pricing">Websites page</a>.`,
  },
  {
    q: 'Do I have to write the website content myself?',
    a: `Nope! Writing the words is part of the package. We'll have a chat (and I'll probably ask a lot of questions) so I can learn about your business, your customers and what makes you different. Then I write the copy for you. You just review it and tell me if anything needs changing.`,
  },
  {
    q: 'Do I need to supply photographs?',
    a: `You don't have to. Licensed stock photography is included in both packages, and I'll choose images that suit your business. If you have your own photos, I'm happy to use them. And if you'd like original photos of your storefront, products or team, I also offer <a href="/websites/#business-photography">business photography</a>, quoted separately.`,
  },
  {
    q: 'Are there hidden or monthly fees?',
    a: `No hidden fees, ever. The package price covers building your website. Every website also needs a domain name (your web address) and hosting to stay online. These are usually small yearly costs, and I'll help you set them up. Optional future updates or third-party subscriptions (like a booking tool) may also cost extra. I'll walk you through exactly what applies to your website, and what it costs, before you commit to anything.`,
  },
  {
    q: 'What if I need scheduling or interactive features?',
    a: `Let's chat! Online booking, appointment scheduling, event calendars, custom forms and other more advanced features are all things I can talk through with you. Because every business needs something a little different, these are quoted separately based on what's involved. <a href="/contact/?service=custom-website">Tell me what you have in mind</a>.`,
  },
  {
    q: 'Will I have to update my website all the time?',
    a: `Not at all. Most small businesses don't need constant updates, so I build websites that stay useful without much fuss. When something does change, like your hours, prices or services, it can be updated. Like anything online, a website may occasionally need a bit of technical upkeep, and I'll be upfront about what that looks like for you.`,
  },
  {
    q: 'How long does a website take?',
    a: `It depends on the size of the project and how quickly we can go back and forth with information and feedback. A one-page website naturally comes together faster than a five-page one. I like to keep things moving, and I'll give you a realistic timeline for your specific project before we start.`,
  },
  {
    q: 'Can you work with clients outside the Ottawa Valley?',
    a: `Absolutely. Website projects can be handled remotely by email, phone or video chat, so you don't need to live around the corner. Wherever you are, <a href="/contact/">get in touch</a> and we'll see if I'm a good fit for you.`,
  },
];

export const photographyFaqs: Faq[] = [
  {
    q: 'Where do you photograph events?',
    a: `I serve the Ottawa Valley and surrounding area, including ${photoTowns}. If your event is a little farther away, just ask. I'd be happy to chat about it.`,
  },
  {
    q: 'What sort of events do you photograph?',
    a: `All kinds of celebrations and get-togethers: retirement parties, corporate events, holiday parties, birthday parties, family reunions, baby showers and more. If you're planning something that isn't on that list, just ask!`,
  },
  {
    q: 'How much does event photography cost?',
    a: `Event photography <strong>starts at $300 for two hours</strong>. The final price depends on things like how many people are attending and how much time you'd like me there. <a href="/contact/?service=event-photography">Tell me about your event</a> and I'll give you a clear price before you book.`,
  },
  {
    q: 'How will I get my photos?',
    a: `After your event, you'll receive an online gallery of your photos with a link you can share with others, so family, friends and guests can enjoy them too.`,
  },
  {
    q: 'Do you take posed photographs or candid ones?',
    a: `Mostly candid. I love blending into the background and catching the real moments: the laughter, the hugs, the happy tears and all the little details. That said, I'm always happy to take any group photos you'd like, too. We'll talk about your must-have shots before the day.`,
  },
  {
    q: 'Do I need to do anything on the day?',
    a: `Just enjoy your event! Before the day, we'll chat about the schedule, the people who matter most and any must-have shots. That way I know what to look out for, and you don't have to think about the photos at all.`,
  },
  {
    q: 'How early should I book?',
    a: `As soon as you know your date, it's a good idea to reach out. I can only be in one place at a time, so earlier is better, especially around the holidays. But if your celebration is coming up soon, don't hesitate to ask. If I'm available, I'd love to be there.`,
  },
  {
    q: 'How do I book?',
    a: `Send me a message through the <a href="/contact/?service=event-photography">contact form</a> with your date, location and a little about your event. I'll get back to you to chat about the details and confirm everything.`,
  },
];
