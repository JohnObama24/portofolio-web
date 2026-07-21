export interface EducationItem {
  id: number;
  title: string;
  institution: string;
  period: string;
  location: string;
  status: string;
  description: string;
}

export const educationList: EducationItem[] = [
  {
    id: 1,
    title: 'Teknik Informatika (Software Engineering)',
    institution: 'Universitas Padjadjaran',
    period: '2026 - 2030 (Expected)',
    location: 'Indonesia',
    status: 'ACTIVE / UNDERGRADUATE',
    description: 'Fokus pada Pengembangan Perangkat Lunak, Arsitektur Aplikasi Web Modern, Algoritma & Struktur Data, serta Sistem Basis Data Terdistribusi.'
  },
  {
    id: 2,
    title: 'Rekayasa Perangkat Lunak (RPL)',
    institution: 'SMK Plus Pelita Nusantara',
    period: '2023 - 2026',
    location: 'Indonesia',
    status: 'GRADUATED / ALUMNI',
    description: 'Memulai fondasi pemrograman dasar, pengembangan web (HTML, CSS, JS, PHP), basis data MySQL, dan metodologi pengembangan sistem informasi.'
  }
];
