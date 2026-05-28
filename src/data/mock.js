export const teachers = [
  { id: 1, name: 'Dilnoza Yusupova', subject: 'Mathematics', experience: '12 years', photo: 'https://i.pravatar.cc/150?img=47', bio: 'Cambridge-certified mathematics teacher specializing in olympiad preparation.' },
  { id: 2, name: 'Jasur Karimov', subject: 'Physics', experience: '9 years', photo: 'https://i.pravatar.cc/150?img=12', bio: 'Former national olympiad champion, now mentoring the next generation.' },
  { id: 3, name: 'Madina Rakhimova', subject: 'English Language', experience: '7 years', photo: 'https://i.pravatar.cc/150?img=45', bio: 'IELTS examiner and Cambridge IGCSE English specialist.' },
  { id: 4, name: 'Sherzod Toshmatov', subject: 'Chemistry', experience: '11 years', photo: 'https://i.pravatar.cc/150?img=15', bio: 'PhD in Organic Chemistry, leads the school science club.' },
  { id: 5, name: 'Nilufar Mirzayeva', subject: 'Biology', experience: '8 years', photo: 'https://i.pravatar.cc/150?img=49', bio: 'Researcher and educator passionate about life sciences.' },
  { id: 6, name: 'Bobur Eshmatov', subject: 'Computer Science', experience: '6 years', photo: 'https://i.pravatar.cc/150?img=18', bio: 'Full-stack developer turned educator, leads the robotics team.' },
]

export const students = [
  { id: 1, name: 'Amir Sotvoldiyev', grade: '11', achievement: 'Gold Medal – National Math Olympiad 2024', photo: 'https://i.pravatar.cc/150?img=33' },
  { id: 2, name: 'Zulfiya Nazarova', grade: '10', achievement: 'Silver – International Physics Olympiad (IPhO)', photo: 'https://i.pravatar.cc/150?img=44' },
  { id: 3, name: 'Doniyor Xasanov', grade: '12', achievement: 'Accepted to MIT — Class of 2028', photo: 'https://i.pravatar.cc/150?img=25' },
  { id: 4, name: 'Sarvinoz Tursunova', grade: '11', achievement: 'Gold – Regional Biology Olympiad', photo: 'https://i.pravatar.cc/150?img=41' },
  { id: 5, name: 'Mansur Qodirov', grade: '9', achievement: '1st Place – TEDx Fergana Presidential School', photo: 'https://i.pravatar.cc/150?img=22' },
  { id: 6, name: 'Feruza Baxromova', grade: '12', achievement: 'Bronze – International Chemistry Olympiad (IChO)', photo: 'https://i.pravatar.cc/150?img=48' },
]

export const articles = [
  {
    id: 1,
    title: 'April Issue 2025',
    excerpt: 'Olympiad champions, campus life highlights, student essays, science features, and a special interview with our founding director.',
    content: '',
    author: 'Editorial Team',
    date: '2025-04-01',
    issue_number: 'April 2025 · Issue 04',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    category: 'Magazine',
    pdf_url: '',
  },
  {
    id: 2,
    title: 'March Issue 2025',
    excerpt: 'TEDx recap, CIS accreditation story, robotics club showcase, and student poetry from across the school.',
    content: '',
    author: 'Editorial Team',
    date: '2025-03-01',
    issue_number: 'March 2025 · Issue 03',
    cover: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    category: 'Magazine',
    pdf_url: '',
  },
  {
    id: 3,
    title: 'February Issue 2025',
    excerpt: 'Winter olympiad results, science lab spotlight, new faculty introductions, and the student photography competition winners.',
    content: '',
    author: 'Editorial Team',
    date: '2025-02-01',
    issue_number: 'February 2025 · Issue 02',
    cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Magazine',
    pdf_url: '',
  },
]

export const galleryItems = [
  { id: 1, url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', caption: 'Graduation Ceremony 2024' },
  { id: 2, url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', caption: 'Science Lab Session' },
  { id: 3, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', caption: 'TEDx Event 2025' },
  { id: 4, url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', caption: 'Math Olympiad Practice' },
  { id: 5, url: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80', caption: 'Sports Day' },
  { id: 6, url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80', caption: 'Library & Study Hall' },
  { id: 7, url: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=600&q=80', caption: 'Cultural Festival' },
  { id: 8, url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80', caption: 'Robotics Club' },
]

export const surveys = [
  {
    id: 1,
    title: 'How satisfied are you with the cafeteria food?',
    isOpen: true,
    questions: [
      { id: 1, text: 'Rate the food quality (1–5)', type: 'rating' },
      { id: 2, text: 'What would you improve?', type: 'text' },
    ],
    responses: 47,
  },
  {
    id: 2,
    title: 'End-of-term student feedback',
    isOpen: false,
    questions: [
      { id: 1, text: 'How would you rate your overall experience this term?', type: 'rating' },
      { id: 2, text: 'Which subject did you enjoy the most?', type: 'multiple_choice', options: ['Math', 'Physics', 'Biology', 'English', 'CS'] },
      { id: 3, text: 'Any suggestions for next term?', type: 'text' },
    ],
    responses: 203,
  },
]
