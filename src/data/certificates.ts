export type Certificate = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  description: string;
  image: string;
  link: string;
};

const certificates: Certificate[] = [
  {
    id: "bnsp-cyber-security",
    title: "Junior Cyber Security",
    publisher: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "18 Juli 2025",
    description:
      "Sertifikasi kompetensi resmi dari BNSP dalam bidang Keamanan dengan kualifikasi Keamanan Siber Muda (Junior Cyber Security). Diterbitkan oleh Lembaga Sertifikasi Profesi Teknologi Digital.",
    image: "/assets/certificates/sertifikat cyber security.jpg",
    link: "",
  },
  {
    id: "bnsp-web-developer",
    title: "Junior Web Developer",
    publisher: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "08 Agustus 2024",
    description:
      "Sertifikasi kompetensi resmi dari BNSP dalam bidang Pengembangan Website dengan kualifikasi Junior Web Developer. Diterbitkan oleh Lembaga Sertifikasi Profesi Teknologi Digital.",
    image: "/assets/certificates/Sertifikat Web Devoloper.jpg",
    link: "",
  },
];

export default certificates;
