import { Student, Internship } from '@/types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    education: 'Computer Science Engineering',
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning', 'SQL'],
    interests: ['Web Development', 'Data Science', 'AI/ML'],
    locationPreference: 'Bangalore',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Rahul Patel',
    email: 'rahul.patel@email.com',
    education: 'Electronics and Communication',
    skills: ['C++', 'Arduino', 'Circuit Design', 'IoT', 'Embedded Systems'],
    interests: ['Hardware Development', 'IoT', 'Robotics'],
    locationPreference: 'Mumbai',
    createdAt: new Date('2024-01-20')
  }
];

export const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'TechCorp Solutions',
    description: 'Join our dynamic team to work on cutting-edge web applications using React, Node.js, and cloud technologies. You will collaborate with senior developers to build scalable solutions and gain hands-on experience with modern development practices.',
    eligibility: ['Computer Science', 'Information Technology', 'Software Engineering'],
    location: 'Bangalore',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
    duration: '3 months',
    stipend: '₹20,000/month',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    description: 'Work with our data science team to analyze large datasets, build predictive models, and create data visualizations. Experience with Python, machine learning libraries, and statistical analysis required.',
    eligibility: ['Computer Science', 'Statistics', 'Mathematics', 'Data Science'],
    location: 'Hyderabad',
    skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL'],
    duration: '4 months',
    stipend: '₹25,000/month',
    createdAt: new Date('2024-02-03')
  },
  {
    id: '3',
    title: 'Frontend Developer Intern',
    company: 'Digital Innovations',
    description: 'Create responsive and interactive user interfaces using modern frontend technologies. Work closely with UI/UX designers to implement pixel-perfect designs and ensure optimal user experience.',
    eligibility: ['Computer Science', 'Information Technology', 'Web Development'],
    location: 'Pune',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
    duration: '3 months',
    stipend: '₹18,000/month',
    createdAt: new Date('2024-02-05')
  },
  {
    id: '4',
    title: 'IoT Development Intern',
    company: 'Smart Systems Ltd',
    description: 'Design and develop IoT solutions using Arduino, Raspberry Pi, and various sensors. Work on projects involving smart home automation, industrial monitoring, and connected devices.',
    eligibility: ['Electronics', 'Computer Science', 'Electrical Engineering'],
    location: 'Chennai',
    skills: ['Arduino', 'C++', 'IoT', 'Sensors', 'Circuit Design', 'Python'],
    duration: '4 months',
    stipend: '₹22,000/month',
    createdAt: new Date('2024-02-07')
  },
  {
    id: '5',
    title: 'Full Stack Developer Intern',
    company: 'StartupHub',
    description: 'Get hands-on experience building end-to-end web applications. Work with both frontend and backend technologies in a fast-paced startup environment with mentorship from experienced developers.',
    eligibility: ['Computer Science', 'Information Technology', 'Software Engineering'],
    location: 'Bangalore',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    duration: '6 months',
    stipend: '₹30,000/month',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '6',
    title: 'Mobile App Development Intern',
    company: 'AppCrafters',
    description: 'Develop cross-platform mobile applications using React Native. Learn mobile-first design principles and work on apps that will be used by thousands of users.',
    eligibility: ['Computer Science', 'Information Technology', 'Mobile Development'],
    location: 'Mumbai',
    skills: ['React Native', 'JavaScript', 'Mobile Development', 'Firebase', 'API Integration'],
    duration: '4 months',
    stipend: '₹24,000/month',
    createdAt: new Date('2024-02-12')
  }
];

export const translations = {
  en: {
    title: 'InternMatch AI',
    subtitle: 'Smart Internship Recommendations',
    heroTitle: 'Find Your Perfect Internship with AI',
    heroSubtitle: 'Our intelligent recommendation system matches you with internships that align with your skills, interests, and career goals.',
    getStarted: 'Get Started',
    viewInternships: 'View Internships',
    whyRecommended: 'Why Recommended',
    skills: 'Skills',
    interests: 'Interests',
    location: 'Location',
    education: 'Education',
    register: 'Register',
    login: 'Login',
    dashboard: 'Dashboard',
    recommendations: 'Recommendations',
    profile: 'Profile',
    notifications: 'Notifications',
    adminDashboard: 'Admin Dashboard',
    totalStudents: 'Total Students',
    totalInternships: 'Total Internships',
    matchesGenerated: 'Matches Generated',
    topSkills: 'Top Skills in Demand'
  },
  hi: {
    title: 'इंटर्नमैच एआई',
    subtitle: 'स्मार्ट इंटर्नशिप सुझाव',
    heroTitle: 'एआई के साथ अपनी परफेक्ट इंटर्नशिप खोजें',
    heroSubtitle: 'हमारा बुद्धिमान सुझाव सिस्टम आपको उन इंटर्नशिप से मिलाता है जो आपके कौशल, रुचियों और करियर लक्ष्यों के साथ मेल खाती हैं।',
    getStarted: 'शुरू करें',
    viewInternships: 'इंटर्नशिप देखें',
    whyRecommended: 'क्यों सुझाया गया',
    skills: 'कौशल',
    interests: 'रुचियां',
    location: 'स्थान',
    education: 'शिक्षा',
    register: 'पंजीकरण',
    login: 'लॉगिन',
    dashboard: 'डैशबोर्ड',
    recommendations: 'सुझाव',
    profile: 'प्रोफाइल',
    notifications: 'सूचनाएं',
    adminDashboard: 'एडमिन डैशबोर्ड',
    totalStudents: 'कुल छात्र',
    totalInternships: 'कुल इंटर्नशिप',
    matchesGenerated: 'मैच बनाए गए',
    topSkills: 'मांग में टॉप कौशल'
  }
};