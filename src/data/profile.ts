// All homepage content lives here, so the design can change without touching the data.

export const profile = {
  name: 'Ahmed Sami',
  title: 'Software Engineer',
  tagline: "I love software and I'm trying to get better every day.",
};

// TODO: replace YOUR_EMAIL_HERE with the email address you want to show publicly.
const email = 'mailto:YOUR_EMAIL_HERE';
const linkedin = 'https://www.linkedin.com/in/a-sami';
const github = 'https://github.com/asamiz';

// Links under the intro on the homepage.
// TODO: add your CV as public/cv.pdf so the "Download CV" link works.
export const introLinks = [
  { label: 'Email', href: email },
  { label: 'LinkedIn', href: linkedin },
  { label: 'GitHub', href: github },
  { label: 'Download CV', href: '/cv.pdf' },
];

// Links in the footer of every page.
export const footerLinks = [
  { label: 'Email', href: email },
  { label: 'LinkedIn', href: linkedin },
  { label: 'GitHub', href: github },
];
