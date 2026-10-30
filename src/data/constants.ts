import {
  BriefcaseBusiness,
  CalendarDays,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  Handshake,
  Keyboard,
  Lightbulb,
  MessageCircle,
  Mic2,
  Presentation,
  Table2,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

  // thoda zada ts ho gya idhar
  // order = keycap layout, 6 per row
  export enum SkillNames {
    HTML = "html",
    CSS = "css",
    BOOTSTRAP = "bootstrap",
    JS = "js",
    PHP = "php",
    PYTHON = "python",
    KOTLIN = "kotlin",
    LARAVEL = "laravel",
    NODEJS = "nodejs",
    MYSQL = "mysql",
    SQLITE = "sqlite",
    GITHUB = "github",
    CANVA = "canva",
    CAPCUT = "capcut",
    MICROSOFT_OFFICE = "microsoftoffice",
    FIGMA = "figma",
    VSCODE = "vscode",
    REACT = "react",
    NEXTJS = "nextjs",
    TAILWIND = "tailwind",
    POSTGRES = "postgres",
    GIT = "git",
    LINUX = "linux",
    DOCKER = "docker",
  }
  export type Skill = {
    id: number;
    name: string;
    label: string;
    shortDescription: string;
    color: string;
    icon: string;
    /** Optional local artwork for the 3D key; falls back to icon. */
    keyboardIcon?: string;
    /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
    keyboardColor?: string;
    /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
    shortcut?: string;
  };
  export const SKILLS: Record<SkillNames, Skill> = {
    [SkillNames.HTML]: {
      id: 1,
      name: "html",
      label: "HTML",
      shortDescription: "Structures the content and layout of web pages.",
      color: "#e34f26",
      icon: "/assets/keyboard/logos/html.svg",
      keyboardIcon: "/assets/keyboard/logos/html.svg",
      keyboardColor: "#1565c0",
    },
    [SkillNames.CSS]: {
      id: 2,
      name: "css",
      label: "CSS",
      shortDescription: "Controls the look, layout, and responsiveness of websites.",
      color: "#1572b6",
      icon: "/assets/keyboard/logos/css.svg",
      keyboardIcon: "/assets/keyboard/logos/css.svg",
      keyboardColor: "#e65100",
    },
    [SkillNames.BOOTSTRAP]: {
      id: 21,
      name: "bootstrap",
      label: "Bootstrap",
      shortDescription: "A CSS framework with ready-made components for building responsive interfaces.",
      color: "#7952b3",
      icon: "/assets/keyboard/logos/bootstrap.svg",
      keyboardIcon: "/assets/keyboard/logos/bootstrap.svg",
      keyboardColor: "#00a89d",
    },
    [SkillNames.JS]: {
      id: 3,
      name: "js",
      label: "JavaScript",
      shortDescription: "Adds interactivity and dynamic behavior to web pages.",
      color: "#f0db4f",
      icon: "/assets/keyboard/logos/js.svg",
      keyboardIcon: "/assets/keyboard/logos/js.svg",
      keyboardColor: "#333537",
    },
    [SkillNames.PHP]: {
      id: 4,
      name: "php",
      label: "PHP",
      shortDescription: "A server-side programming language for building web applications.",
      color: "#777bb4",
      icon: "/assets/keyboard/logos/php.svg",
      keyboardIcon: "/assets/keyboard/logos/php.svg",
      keyboardColor: "#f2c94c",
    },
    [SkillNames.PYTHON]: {
      id: 5,
      name: "python",
      label: "Python",
      shortDescription: "A versatile language for automation, data processing, and application development.",
      color: "#3776ab",
      icon: "/assets/keyboard/logos/python.svg",
      keyboardIcon: "/assets/keyboard/logos/python.svg",
      keyboardColor: "#6b4eff",
    },
    [SkillNames.KOTLIN]: {
      id: 6,
      name: "kotlin",
      label: "Kotlin",
      shortDescription: "A modern programming language widely used for Android apps.",
      color: "#7f52ff",
      icon: "/assets/keyboard/logos/kotlin.svg",
      keyboardIcon: "/assets/keyboard/logos/kotlin.svg",
      keyboardColor: "#17435b",
    },
    [SkillNames.LARAVEL]: {
      id: 7,
      name: "laravel",
      label: "Laravel",
      shortDescription: "A PHP framework for building well-structured web applications.",
      color: "#ff2d20",
      icon: "/assets/keyboard/logos/laravel.svg",
      keyboardIcon: "/assets/keyboard/logos/laravel.svg",
      keyboardColor: "#1565c0",
    },
    [SkillNames.NODEJS]: {
      id: 22,
      name: "nodejs",
      label: "Node.js",
      shortDescription: "A JavaScript runtime for running code on the server side.",
      color: "#6cc24a",
      icon: "/assets/keyboard/logos/nodejs.svg",
      keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
      keyboardColor: "#b71c1c",
    },
    [SkillNames.NEXTJS]: {
      id: 8,
      name: "nextjs",
      label: "Next.js",
      shortDescription: "A React framework for building web apps with built-in rendering and routing.",
      color: "#ffffff",
      icon: "/assets/keyboard/logos/nextjs.svg",
      keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
      keyboardColor: "#7050b8",
    },
    [SkillNames.REACT]: {
      id: 9,
      name: "react",
      label: "React",
      shortDescription: "A JavaScript library for building component-based user interfaces.",
      color: "#61dafb",
      icon: "/assets/keyboard/logos/react.svg",
      keyboardIcon: "/assets/keyboard/logos/react.svg",
      keyboardColor: "#c96a21",
    },
    [SkillNames.TAILWIND]: {
      id: 10,
      name: "tailwind",
      label: "Tailwind CSS",
      shortDescription: "A utility-first CSS framework for styling interfaces quickly.",
      color: "#38bdf8",
      icon: "/assets/keyboard/logos/tailwind.svg",
      keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
      keyboardColor: "#c62828",
    },
    [SkillNames.MYSQL]: {
      id: 11,
      name: "mysql",
      label: "MySQL",
      shortDescription: "A relational database system for storing and managing application data.",
      color: "#4479a1",
      icon: "/assets/keyboard/logos/mysql.svg",
      keyboardIcon: "/assets/keyboard/logos/mysql.svg",
      keyboardColor: "#e2128c",
    },
    [SkillNames.SQLITE]: {
      id: 23,
      name: "sqlite",
      label: "SQLite",
      shortDescription: "A lightweight database that stores all its data in a single local file.",
      color: "#003b57",
      icon: "/assets/keyboard/logos/sqlite.svg",
      keyboardIcon: "/assets/keyboard/logos/sqlite.svg",
      keyboardColor: "#6a3dad",
    },
    [SkillNames.POSTGRES]: {
      id: 12,
      name: "postgres",
      label: "PostgreSQL",
      shortDescription: "A relational database system for storing and processing data reliably.",
      color: "#336791",
      icon: "/assets/keyboard/logos/postgres.svg",
      keyboardIcon: "/assets/keyboard/logos/postgres.svg",
      keyboardColor: "#2e7d32",
    },
    [SkillNames.GIT]: {
      id: 13,
      name: "git",
      label: "Git",
      shortDescription: "A version control system for tracking and managing code changes.",
      color: "#f1502f",
      icon: "/assets/keyboard/logos/git.svg",
      keyboardIcon: "/assets/keyboard/logos/git.svg",
      keyboardColor: "#333537",
    },
    [SkillNames.GITHUB]: {
      id: 14,
      name: "github",
      label: "GitHub",
      shortDescription: "A platform for hosting Git repositories and collaborating on code.",
      color: "#ffffff",
      icon: "/assets/keyboard/logos/github.svg",
      keyboardIcon: "/assets/keyboard/logos/github.svg",
      keyboardColor: "#ef6c00",
    },
    [SkillNames.LINUX]: {
      id: 15,
      name: "linux",
      label: "Linux",
      shortDescription: "An open-source operating system used through both graphical interfaces and the terminal.",
      color: "#fcc624",
      icon: "/assets/keyboard/logos/linux.svg",
      keyboardIcon: "/assets/keyboard/logos/linux.svg",
      keyboardColor: "#1e7bb0",
    },
    [SkillNames.DOCKER]: {
      id: 24,
      name: "docker",
      label: "Docker",
      shortDescription: "A platform for packaging applications and their dependencies into containers.",
      color: "#2496ed",
      icon: "/assets/keyboard/logos/docker.svg",
      keyboardIcon: "/assets/keyboard/logos/docker.svg",
      keyboardColor: "#c62828",
    },
    [SkillNames.CANVA]: {
      id: 16,
      name: "canva",
      label: "Canva",
      shortDescription: "A visual design tool for creating presentations, posters, and digital content.",
      color: "#00c4cc",
      icon: "/assets/keyboard/logos/canva.svg",
      keyboardIcon: "/assets/keyboard/logos/canva.svg",
      keyboardColor: "#6843b8",
    },
    [SkillNames.CAPCUT]: {
      id: 17,
      name: "capcut",
      label: "CapCut",
      shortDescription: "A video editing app for trimming clips and adding effects and text.",
      color: "#ffffff",
      icon: "/assets/keyboard/logos/capcut.svg",
      keyboardIcon: "/assets/keyboard/logos/capcut.svg",
      keyboardColor: "#22252b",
    },
    [SkillNames.MICROSOFT_OFFICE]: {
      id: 18,
      name: "microsoftoffice",
      label: "Microsoft Office",
      shortDescription: "A suite of productivity apps for documents, spreadsheets, and presentations.",
      color: "#d83b01",
      icon: "/assets/keyboard/logos/microsoft-office.svg",
      keyboardIcon: "/assets/keyboard/logos/microsoft-office.svg",
      keyboardColor: "#174ea6",
    },
    [SkillNames.FIGMA]: {
      id: 19,
      name: "figma",
      label: "Figma",
      shortDescription: "An interface design and prototyping tool that supports collaboration.",
      color: "#f24e1e",
      icon: "/assets/keyboard/logos/figma.svg",
      keyboardIcon: "/assets/keyboard/logos/figma.svg",
      keyboardColor: "#253858",
    },
    [SkillNames.VSCODE]: {
      id: 20,
      name: "vscode",
      label: "Visual Studio Code",
      shortDescription: "A code editor for writing, running, and managing programming projects.",
      color: "#007acc",
      icon: "/assets/keyboard/logos/vscode.svg",
      keyboardIcon: "/assets/keyboard/logos/vscode.svg",
      keyboardColor: "#e68a00",
    },
  };


export type ExtraSkill = { label: string; icon?: string; Icon?: LucideIcon };
const EXTRA_SKILL_DATA = {
  laravel: {
    label: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  php: {
    label: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  css: {
    label: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  leadership: { label: "Leadership", Icon: UsersRound },
  eventPlanning: { label: "Event Planning", Icon: CalendarDays },
  publicSpeaking: { label: "Public Speaking", Icon: Mic2 },
  problemSolving: { label: "Problem Solving", Icon: Lightbulb },
  teamwork: { label: "Teamwork", Icon: Handshake },
  communication: { label: "Communication", Icon: MessageCircle },
  documentControl: { label: "Document Control", Icon: ClipboardCheck },
  documentTyping: { label: "Document Typing", Icon: Keyboard },
  microsoftOffice: { label: "Microsoft Office", Icon: BriefcaseBusiness },
  microsoftWord: { label: "Microsoft Word", Icon: FileText },
  microsoftExcel: { label: "Microsoft Excel", Icon: FileSpreadsheet },
  powerPoint: { label: "PowerPoint", Icon: Presentation },
  googleSheets: { label: "Google Sheets", Icon: Table2 },
} satisfies Record<string, ExtraSkill>;
export type ExtraSkillName = keyof typeof EXTRA_SKILL_DATA;
export const EXTRA_SKILLS: Record<ExtraSkillName, ExtraSkill> = EXTRA_SKILL_DATA;

  export type Experience = {
    id: number;
    // multiple periods = returning stint, avoids a duplicate card
    periods: { start: string; end: string }[];
    title: string;
    company: string;
    description: string[];
    skills: (SkillNames | ExtraSkillName)[];
  };

  export const EXPERIENCE: Experience[] = [
    
    {
      id: 1,
      periods: [{ start: "Jun 2025", end: "Nov 2025" }],
      title: "IT Intern – Divisi Teknologi Sistem Informasi (TSI)",
      company: "Perumda Air Minum Surya Sembada Kota Surabaya",
      description: [
      "Developed a Project Management web application to help centrally monitor the division's task progress and schedules.",
      "Checked and tested application functions to make sure features worked as required.",
      "Collaborated with the team on developing, maintaining, and improving internal information systems.",
    ],
      skills: [
         SkillNames.NEXTJS,
      SkillNames.REACT,
      SkillNames.POSTGRES,
      SkillNames.TAILWIND,
      "laravel",
      "php",
      "css",
      ],
    },
    {
      id: 2,
      periods: [{ start: "2024", end: "2025" }],
      title: "Koordinasi Divisi Dalam Negeri",
    company: "Himpunan Mahasiswa Teknologi Informasi (HIMATIF) · Politeknik Negeri Madiun",
      description: [
      "Actively involved in organizing student activities, including academic seminars and the campus orientation program.",
      "Entrusted as Event Chair of the HIMATIF Anniversary event, responsible for planning, leading the organizing committee, and ensuring the event ran smoothly.",
    ],
          skills: [
      "leadership",
      "eventPlanning",
      "publicSpeaking",
      "problemSolving",
      "teamwork",
      "communication",
    ],
    },

    {
      id: 3,
      periods: [{ start: "2026", end: "2026" }],
      title: "Freelance Document Control & Office Support",
      company: "Independent · Remote",
      description: [
        "Organize and maintain digital documents with clear naming, structured folders, and reliable version control, making files easier to find and manage.",
        "Type, proofread, and polish reports, letters, and administrative documents in Microsoft Word, with careful attention to accuracy and presentation.",
        "Create and update Excel and Google Sheets trackers for data entry, records, schedules, and day-to-day monitoring.",
        "Build clean, engaging PowerPoint presentations and refine existing slides to communicate information clearly.",
      ],
      skills: [
        "documentControl",
        "documentTyping",
        "microsoftOffice",
        "microsoftWord",
        "microsoftExcel",
        "powerPoint",
        "googleSheets",
      ],
    },
  ];

  export const themeDisclaimers = {
    light: [
      "Warning: Light mode emits a gazillion lumens of pure radiance!",
      "Caution: Light mode ahead! Please don't try this at home.",
      "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
      "Brace yourself! Light mode is about to make everything shine brighter than your future.",
      "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
    ],
    dark: [
      "Light mode? I thought you went insane... but welcome back to the dark side!",
      "Switching to dark mode... How was life on the bright side?",
      "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
      "Welcome back to the shadows. How was life out there in the light?",
      "Dark mode on! Finally, someone who understands true sophistication.",
    ],
  };