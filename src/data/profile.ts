// All homepage content lives here, so the design can change without touching the data.

export const profile = {
  name: 'Ahmed Sami',
  title: 'Senior Mobile Engineer',
  location: 'Riyadh',
  intro:
    'I build iOS and Android apps with React Native and native code. 7+ years across banking, developer tools and automotive.',
};

// TODO: replace YOUR_EMAIL_HERE with the email address you want to show publicly.
export const contacts = [
  { label: 'Email', href: 'mailto:YOUR_EMAIL_HERE' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/a-sami' },
  { label: 'GitHub', href: 'https://github.com/asamiz' },
  { label: 'X', href: 'https://x.com/ahmed_sami_dev' },
];

export const experience = [
  {
    dates: 'Nov 2023 – now',
    role: 'Senior Mobile Engineer',
    company: 'Al Rajhi Bank',
    summary: "Retail banking app. Shipped the Apple Wallet extension and built the app's CI/CD pipeline.",
  },
  {
    dates: 'May 2023 – Nov 2023',
    role: 'Senior Cross-Platform Engineer',
    company: 'Instabug',
    summary: 'Built and maintained SDKs for React Native, Flutter, Ionic, Cordova and Unity.',
  },
  {
    dates: 'Aug 2021 – May 2023',
    role: 'Senior Mobile Development Engineer',
    company: 'Valeo',
    summary:
      'Built cross-platform iOS and Android apps in React Native, with CI/CD on Jenkins and Fastlane and support for 10+ languages.',
  },
  {
    dates: 'Jan 2020 – Nov 2023',
    role: 'Part-time Instructor',
    company: 'ITI',
    summary: 'Taught React Native and MongoDB courses.',
  },
];
