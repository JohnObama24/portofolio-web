export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Work' | 'Organization' | 'Freelance';
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experienceList: ExperienceItem[] = [
  {
    id: 1,
    role: 'Web Developer',
    company: 'Synchronize Teams',
    period: '2024 - Present',
    location: 'Indonesia',
    type: 'Work',
    description: 'Bertanggung jawab dalam merancang dan merawat aplikasi web enterprise menggunakan ekosistem Vue/Nuxt.js & Laravel.',
    responsibilities: [
      'Pengembangan Website',
    ],
    technologies: ['Nuxt', 'Vue.js', 'Laravel', 'TypeScript', 'Tailwind CSS',]
  },
  {
    id: 2,
    role: 'Mobile developer (Intern)',
    company: 'PT. Samudera biru digital indonesia',
    period: '2024 - 2025',
    location: 'Indonesia',
    type: 'Work',
    description: 'Memimpin perancangan frontend antarmuka e-voting sekolah untuk digitalisasi pemilihan OSIS secara transparan.',
    responsibilities: [
      'Membantu pengembangan sebuah aplikasi mobile',
    ],
    technologies: ['React', 'Tailwind CSS', 'Flutter', 'Laravel',]
  },
  {
    id: 3,
    role: 'Member Devaccto',
    company: 'Devaccto',
    period: '2022 - 2023',
    location: 'Indonesia',
    type: 'Organization',
    description: 'Menjadi anggota aktif devaccto, mengikuti berbagai kegiatan dan project yang diadakan oleh devaccto',
    responsibilities: [
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'Linux Shell', 'Git', 'MySQL']
  }
];
