import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  raspberryPi: {
    title: "Raspberry Pi 4",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">Pi 4</span>,
  },
  flaskSocketIO: {
    title: "Flask-SocketIO",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">Socket.IO</span>,
  },
  rfid: {
    title: "RFID RC522",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">RFID</span>,
  },
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">HTML</span>,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">CSS</span>,
  },
  cssScss: {
    title: "CSS/SCSS",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">CSS</span>,
  },
  js: brand("JavaScript", "javascript-mono.svg"),
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Bs</span>,
  },
  bootstrap5: {
    title: "Bootstrap 5",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Bs5</span>,
  },
  tailwindSelective: {
    title: "Tailwind CSS (beberapa halaman)",
    bg: "black",
    fg: "white",
    icon: <MaskIcon src="/assets/logos/tailwind-css-mono.svg" title="Tailwind CSS" />,
  },
  php: {
    title: "PHP",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">PHP</span>,
  },
  laravel: {
    title: "Laravel",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">Laravel</span>,
  },
  laravelBlade: {
    title: "Laravel Blade",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">Blade</span>,
  },
  php82: {
    title: "PHP 8.2",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">PHP 8.2</span>,
  },
  laravel12: {
    title: "Laravel 12",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">L12</span>,
  },
  eloquent: {
    title: "Eloquent ORM",
    bg: "black",
    fg: "white",
    icon: <span className="text-[9px] font-bold">ORM</span>,
  },
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  electron: brand("Electron", "electron-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  astro: brand("Astro", "astro-mono.svg"),
  sqlite: brand("SQLite", "sqlite-mono.svg"),
  ffmpeg: brand("FFmpeg", "ffmpeg-mono.svg"),
  ollama: brand("Ollama", "ollama-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  previewImages?: string[];
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  showSource?: boolean;
  live: string;
};
const projects: Project[] = [
  {
    id: "storekit",
    category: "E-Commerce Platform for Gadget & Electronics",
    title: "Berkah Gadget",
    src: "/assets/projects-screenshots/storekit/berkah-gadget-landing.png",
    previewImages: [
      `${BASE_PATH}/storekit/berkah-gadget-landing.png`,
      `${BASE_PATH}/storekit/berkah-gadget-login.png`,
      `${BASE_PATH}/storekit/berkah-gadget-orders-v2.png`,
      `${BASE_PATH}/storekit/berkah-gadget-storefront.png`,
      `${BASE_PATH}/storekit/berkah-gadget-themes.png`,
    ],
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.laravelBlade,
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.cssScss,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.bootstrap5,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.tailwindSelective,
      ],
      backend: [
        PROJECT_SKILLS.php82,
        PROJECT_SKILLS.laravel12,
        PROJECT_SKILLS.eloquent,
        PROJECT_SKILLS.sqlite,
      ],
    },
    live: "#",
    github: "https://github.com/Hanz3000/toko-berkah-gadget",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Berkah Gadget — E-Commerce Platform for Gadget & Electronics
          </TypographyP>
          <TypographyP className="font-mono ">
            Website e-commerce untuk toko gadget yang menghubungkan pengalaman
            belanja pelanggan dengan pengelolaan produk oleh admin. Dibangun
            menggunakan Laravel dan PHP, dengan MariaDB/MySQL sebagai basis
            data.
          </TypographyP>
          <TypographyP className="font-mono ">
            Website ini mencakup katalog produk gadget dan aksesoris, halaman
            detail, pencarian, keranjang belanja, serta daftar favorit. Admin
            dapat mengelola produk dan gambar, konten carousel, pengguna, serta
            pesan pengunjung melalui dashboard.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">Fitur utama</TypographyH3>
          <ul className="font-mono mb-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Katalog produk:</strong> menampilkan informasi harga,
              kategori, warna, deskripsi, kelebihan, kekurangan, dan kelengkapan
              produk.
            </li>
            <li>
              <strong>Pengelolaan admin:</strong> tambah, ubah, dan hapus produk
              serta mengelola konten carousel.
            </li>
            <li>
              <strong>Fitur pelanggan:</strong> pencarian produk, keranjang
              belanja, favorit, dan halaman detail produk.
            </li>
            <li>
              <strong>Akun dan akses:</strong> login dengan peran admin dan
              pengguna.
            </li>
            <li>
              <strong>Interaksi pengunjung:</strong> formulir kontak dan
              tampilan pesan pengunjung.
            </li>
            <li>
              <strong>Pengelolaan data:</strong> skema basis data menggunakan
              migrasi serta data contoh melalui seeder, termasuk katalog 30
              produk untuk kebutuhan demo.
            </li>
          </ul>
          <TypographyP className="font-mono ">
            Proyek ini menunjukkan penerapan pola MVC Laravel, relasi basis
            data, validasi formulir, unggah dan penyajian gambar, serta
            pengembangan antarmuka untuk pelanggan dan admin.
          </TypographyP>
          <SlideShow
            images={[
              `${BASE_PATH}/storekit/berkah-gadget-landing.png`,
              `${BASE_PATH}/storekit/berkah-gadget-login.png`,
              `${BASE_PATH}/storekit/berkah-gadget-orders-v2.png`,
              `${BASE_PATH}/storekit/berkah-gadget-storefront.png`,
              `${BASE_PATH}/storekit/berkah-gadget-themes.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "project-management-gantt",
    category: "Project Planning & Progress Monitoring System",
    title: "Project Management",
    src: "/assets/projects-screenshots/project-management-gantt/landing.png",
    previewImages: [
      `${BASE_PATH}/project-management-gantt/landing.png`,
      `${BASE_PATH}/project-management-gantt/ai-connection.png`,
      `${BASE_PATH}/project-management-gantt/library.png`,
      `${BASE_PATH}/project-management-gantt/overview.png`,
      `${BASE_PATH}/project-management-gantt/transcript.png`,
    ],
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.bootstrap,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.php,
        PROJECT_SKILLS.laravel,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "#",
    github: "https://github.com/Hanz3000/Project-Magang_Gantt-Chart",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Project Management — Aplikasi Pemantauan Progres
            dan Jadwal Tugas
          </TypographyP>
          <TypographyP className="font-mono ">
            Website manajemen proyek internal untuk memantau progres dan jadwal
            tugas secara terstruktur melalui visualisasi interaktif. Dibangun
            menggunakan Laravel dan PHP dengan PostgreSQL sebagai basis data
            utama. Pengguna dapat mengelola tugas utama dan sub-tugas, menentukan
            durasi, serta memantau alur pekerjaan melalui diagram Gantt.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            Fitur utama
          </TypographyH3>
          <ul className="font-mono mb-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Visualisasi Gantt Chart:</strong> menampilkan jadwal
              proyek, hierarki tugas dan sub-tugas, progres pekerjaan dalam
              bentuk indikator, serta penanggung jawab melalui tooltip.
            </li>
            <li>
              <strong>Manajemen tugas:</strong> tambah, ubah, dan hapus tugas
              utama maupun sub-tugas, termasuk detail, estimasi durasi, tanggal
              mulai dan selesai, serta alokasi personel.
            </li>
            <li>
              <strong>Penjadwalan cerdas:</strong> mendeteksi sub-tugas dan
              menawarkan pilihan untuk menggeser jadwalnya secara proporsional
              atau mempertahankan jadwal saat waktu tugas induk berubah.
            </li>
            <li>
              <strong>Ekspor laporan PDF:</strong> mengekspor tabel tugas beserta
              visualisasi Gantt Chart secara dinamis untuk kebutuhan pelaporan.
            </li>
            <li>
              <strong>Akun dan akses:</strong> autentikasi menggunakan Nomor
              Induk Pegawai (NIP), pengelolaan profil, dan pembaruan kata sandi
              secara mandiri.
            </li>
            <li>
              <strong>Filter data:</strong> menyaring tugas dan diagram
              berdasarkan rentang tanggal atau kategori.
            </li>
          </ul>
          <TypographyP className="font-mono">
            Proyek ini menunjukkan penerapan antarmuka visual yang interaktif,
            pengelolaan basis data relasional dengan PostgreSQL, serta logika
            sinkronisasi jadwal otomatis antara tugas induk dan sub-tugas.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">
            Pemantauan jadwal dan progres
          </TypographyH3>
          <TypographyP className="font-mono">
            Diagram Gantt membantu pengguna melihat urutan pekerjaan, relasi
            antar tugas, penanggung jawab, dan perkembangan proyek dalam satu
            tampilan. Filter tanggal dan kategori memudahkan pemantauan bagian
            proyek yang dibutuhkan.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">
            Penjadwalan tugas induk dan sub-tugas
          </TypographyH3>
          <TypographyP className="font-mono">
            Saat jadwal tugas induk berubah, sistem mendeteksi sub-tugas yang
            terkait dan memberikan pilihan untuk menyesuaikan jadwal secara
            proporsional atau mempertahankan tanggal yang sudah ditetapkan.
            Laporan proyek dapat diekspor ke PDF beserta tabel tugas dan
            visualisasi diagram Gantt.
          </TypographyP>
          <SlideShow
            autoplay={false}
            images={[
              `${BASE_PATH}/project-management-gantt/landing.png`,
              `${BASE_PATH}/project-management-gantt/ai-connection.png`,
              `${BASE_PATH}/project-management-gantt/library.png`,
              `${BASE_PATH}/project-management-gantt/overview.png`,
              `${BASE_PATH}/project-management-gantt/transcript.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "codingducks",
    category: "Interactive IoT Learning Media",
    title: "Tugas Akhir",
    src: "/assets/projects-screenshots/codingducks/4.png",
    previewImages: [
      `${BASE_PATH}/codingducks/4.png`,
      `${BASE_PATH}/codingducks/5.png`,
      `${BASE_PATH}/codingducks/6.png`,
      `${BASE_PATH}/codingducks/1.png`,
      `${BASE_PATH}/codingducks/3.png`,
      `${BASE_PATH}/codingducks/2.jpeg`,
    ],
    screenshots: ["1.png", "2.jpeg", "3.png", "4.png", "5.png", "6.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.raspberryPi,
        PROJECT_SKILLS.flaskSocketIO,
        PROJECT_SKILLS.rfid,
      ],
    },
    live: "#",
    github:
      "https://github.com/Hanz3000/TUGAS-AKHIR-MEDIA-PEMBELAJARAN_FARHAN-ABDILAH_233307076.git",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Tugas Akhir — Media Pembelajaran Interaktif Berbasis IoT untuk Anak
            Usia Dini
          </TypographyP>
          <TypographyP className="font-mono ">
            Alat peraga edukasi fisik berbentuk koper portabel yang terintegrasi
            dengan aplikasi web untuk mengenalkan rambu lalu lintas pada anak
            usia dini. Sistem menggunakan Raspberry Pi 4 sebagai server lokal,
            Python untuk logika perangkat keras, dan Next.js sebagai antarmuka
            pengguna. Interaksi kartu RFID mengubah metode belajar pasif menjadi
            aktivitas kinestetik tanpa ketergantungan berlebih pada layar gawai.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">
            Fitur utama
          </TypographyH3>
          <p className="font-mono mb-2">
            Kartu ber-Tag RFID dimasukkan ke slot fisik koper dan dibaca oleh
            sensor RFID RC522 untuk menjawab soal. Flask-SocketIO mengirimkan
            hasil pembacaan ke antarmuka web secara real-time, sehingga jawaban
            dapat divalidasi tanpa jeda.
          </p>
          <div className="mx-auto max-w-lg">
            <SlideShow images={[`${BASE_PATH}/codingducks/1.png`]} />
          </div>
          <TypographyH3 className="my-4 mt-8">
            Umpan balik interaktif dan animasi edukatif
          </TypographyH3>
          <p className="font-mono mb-2">
            Jawaban benar atau salah ditampilkan melalui perubahan warna
            indikator slot (hijau atau merah), animasi karakter, dan efek suara
            dari speaker. Setelah semua soal dalam satu sesi dijawab dengan
            benar, sistem memutar video animasi pembelajaran secara otomatis.
            Materi animasi diproduksi menggunakan Google Flow dan Canva.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/4.png`,
              `${BASE_PATH}/codingducks/5.png`,
              `${BASE_PATH}/codingducks/6.png`,
            ]}
          />
          <TypographyH3 className="my-4 mt-8">
            Dirancang untuk penggunaan di kelas
          </TypographyH3>
          <p className="font-mono mb-2">
            Guru dapat menjeda atau melewati tayangan video menggunakan
            push button fisik tanpa mouse atau keyboard. Sistem beroperasi
            mandiri sebagai server lokal pada Raspberry Pi 4, sehingga dapat
            digunakan tanpa koneksi internet maupun komputer tambahan di kelas.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/codingducks/2.jpeg`,
              `${BASE_PATH}/codingducks/3.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "My Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing-20261030.png",
    screenshots: ["1.png"],
    live: "#",
    github: "https://github.com/Hanz3000/My-Portfolio.git",
    showSource: true,
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.motion,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Selamat datang di ruang digital saya, tempat kreativitas dan kode
            berpadu untuk menghadirkan pengalaman yang menarik dan interaktif.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">
            Objek 3D Interaktif
          </TypographyH3>
          <p className="font-mono mb-2">
            Portofolio ini memiliki keyboard interaktif dalam bentuk 3D yang
            ditampilkan langsung di halaman web. Tekan setiap tombol untuk
            melihat keahlian yang terkait—menggabungkan eksplorasi teknologi
            dengan pengalaman visual yang menyenangkan.
          </p>
          <SlideShow
            autoplay={false}
            images={[`${BASE_PATH}/portfolio/landing-20261030.png`]}
          />
          <TypographyH3 className="my-4 mt-8">Keahlian</TypographyH3>
          <p className="font-mono mb-2">
            Bagian keahlian menampilkan teknologi dan alat yang saya gunakan
            dalam pengembangan web.
          </p>
          <SlideShow
            autoplay={false}
            images={[`${BASE_PATH}/portfolio/skills.png`]}
          />
          <TypographyH3 className="my-4 ">Hubungi Saya</TypographyH3>
          <p className="font-mono mb-2">
            Formulir kontak untuk mengirim pesan email secara langsung dan tombol cepat menuju media sosial atau
platform profesional.
          </p>
          <SlideShow
            autoplay={false}
            images={[`${BASE_PATH}/portfolio/navbar-20261030.png`]}
          />
          <TypographyH3 className="my-4 mt-8">Proyek</TypographyH3>

          <p className="font-mono mb-2">
            Jelajahi berbagai proyek pribadi dan pekerjaan lepas yang
            menampilkan proses, solusi, dan teknologi yang saya gunakan.
          </p>
          <SlideShow
            autoplay={false}
            images={[`${BASE_PATH}/portfolio/projects-20261030-v2.png`]}
          />
          <p className="font-mono mb-2 mt-8 text-center">
            Situs ini bukan sekadar portofolio, tetapi juga ruang untuk
            menunjukkan kreativitas dan cara saya berkarya.
          </p>
        </div>
      );
    },
  },
];
export default projects;
