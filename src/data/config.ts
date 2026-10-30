const config = {
  title: "Farhan Abdilah Ramadhan | Software Engineer",
  description: {
    long: "Explore the portfolio of Naresh, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Naresh, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Naresh",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Framer Motion",
  ],
  author: "Farhan abdilah Ramadhan",
  email: "Farhanabdillah501@gmail.com",
  site: "https://nareshkhatri.dev",

  // for github stars button
  githubUsername: "naresh-khatri",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/nothotchaddi",
    linkedin: "https://www.linkedin.com/in/farhan-abdilah-ramadhan",
    instagram: "https://www.instagram.com/farhanrmdhan__/",
    facebook: "https://www.facebook.com/HotChaddi/",
    github: "https://github.com/Hanz3000",
    whatsapp: "https://wa.me/62881036357795",
  },
};
export { config };
