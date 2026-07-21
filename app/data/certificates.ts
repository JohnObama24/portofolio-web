export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  year: string;
  status: string;
  credentialId?: string;
  description: string;
  skills: string[];
  link?: string;
}

export const certificateList: CertificateItem[] = [
  // {
  //   id: 1,
  //   title: 'Full-Stack Web Development Certification',
  //   issuer: 'Dicoding Indonesia / Google Bangkit',
  //   year: '2024',
  //   status: 'VERIFIED CERTIFICATE',
  //   credentialId: 'DICODING-DEV-2024-8849',
  //   description: 'Sertifikasi profesional tingkat lanjut meliputi arsitektur Frontend dengan Vue/Nuxt, Backend RESTful API, Performance Optimization, dan Progressive Web Apps (PWA).',
  //   skills: ['Nuxt 3', 'State Management', 'PWA', 'Tailwind CSS', 'API Integration'],
  //   link: 'https://github.com/JohnObama24'
  // },
  // {
  //   id: 2,
  //   title: 'Cloud Computing & DevOps Fundamentals',
  //   issuer: 'Amazon Web Services (AWS) Training',
  //   year: '2023',
  //   status: 'COMPLETED',
  //   credentialId: 'AWS-CERT-9901-XL',
  //   description: 'Pelatihan dan sertifikasi dasar arsitektur cloud, serverless computing, deployment CI/CD pipeline, dan pengelolaan kontainer aplikasi.',
  //   skills: ['AWS EC2/S3', 'Docker', 'CI/CD Pipelines', 'Linux Terminal', 'Nginx'],
  //   link: 'https://github.com/JohnObama24'
  // },
  // {
  //   id: 3,
  //   title: 'Cyber Security & Network Basics',
  //   issuer: 'Cisco Networking Academy',
  //   year: '2023',
  //   status: 'COMPLETED',
  //   credentialId: 'CISCO-SEC-7720',
  //   description: 'Pemahaman dasar keamanan jaringan, enkripsi data, penanganan kerentanan sistem, dan protokol komunikasi web yang aman.',
  //   skills: ['Cyber Security', 'Network Protocols', 'SSL/TLS', 'Firewall Basics'],
  //   link: 'https://github.com/JohnObama24'
  // }
];
