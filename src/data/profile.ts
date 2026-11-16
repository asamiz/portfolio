// All homepage content lives here, so the design can change without touching the data.

export const profile = {
  name: 'Ahmed Sami',
  title: 'Software Engineer',
  tagline: "I love software and I'm trying to get better every day.",
};

const email = 'mailto:ahmed.sami.elsherif@gmail.com';
const linkedin = 'https://www.linkedin.com/in/a-sami';
const github = 'https://github.com/asamiz';

// Your profiles on other sites. Search engines use these to link them to this site.
export const profileLinks = [linkedin, github];

// Links under the intro on the homepage. To update the CV, replace public/cv.pdf.
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
