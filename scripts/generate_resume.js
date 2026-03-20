const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Install pdfkit into temp dir if needed
const pkgDir = 'C:\\Windows\\Temp\\pdfkit_pkg';
if (!fs.existsSync(path.join(pkgDir, 'node_modules', 'pdfkit'))) {
  fs.mkdirSync(pkgDir, { recursive: true });
  execSync('npm install pdfkit', { cwd: pkgDir, stdio: 'inherit' });
}

const PDFDocument = require(path.join(pkgDir, 'node_modules', 'pdfkit'));
const outputPath = path.join(__dirname, '../public/resume.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 50, right: 50 }
});

doc.pipe(fs.createWriteStream(outputPath));

const primaryColor = '#000000';
const secondaryColor = '#333333';
const accentColor = '#10B981'; // Emerald 500

doc.registerFont('Bold', 'Helvetica-Bold');
doc.registerFont('Regular', 'Helvetica');

// --- HEADER ---
doc.font('Bold').fontSize(24).fillColor(primaryColor).text('Akula Naga Sai', { align: 'center' });
doc.moveDown(0.5);

doc.font('Regular').fontSize(10).fillColor(secondaryColor);
doc.text('nagasai.akula.dev@gmail.com   |   +91 7995877013', { align: 'center' });
doc.moveDown(0.2);
doc.fillColor(accentColor).text('Portfolio: https://saiportfoliio.netlify.app/', { align: 'center', link: 'https://saiportfoliio.netlify.app/' });
doc.text('GitHub: https://github.com/sai1781   |   LeetCode: https://leetcode.com/u/nagasaitac143', { align: 'center' });

doc.moveDown(1.5);

// helper for sections
function addSectionHeader(title) {
  doc.font('Bold').fontSize(12).fillColor(primaryColor).text(title.toUpperCase());
  doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - 50, doc.y).strokeColor(primaryColor).stroke();
  doc.moveDown(0.5);
}

// --- PROFESSIONAL SUMMARY ---
addSectionHeader('Professional Summary');
doc.font('Regular').fontSize(10).fillColor(secondaryColor);
doc.text(
  'Senior MERN Stack Developer with 4 years of experience building scalable, production-grade web applications serving 150K+ daily active users. Strong expertise in React.js, Node.js, Express.js and MongoDB with a focus on secure RESTful API development, JWT-based authentication, role-based access control (RBAC), and performance optimization. Experienced in designing reusable component architectures, optimizing database queries, and delivering high-availability systems with 99.9% uptime in Agile environments.',
  { align: 'justify', lineHeight: 1.5 }
);
doc.moveDown(1);

// --- SKILLS ---
addSectionHeader('Skills');
const skills = [
  { label: 'Languages', text: 'JavaScript(ES6+), TypeScript, Java' },
  { label: 'Frontend', text: 'React.js, Redux Toolkit, React Hooks, HTML5, CSS3, TailwindCSS and Material-UI' },
  { label: 'Tools&Platform', text: 'Git, GitHub, GitLab, Jira, Figma, VS Code, Netlify, Vercel' },
  { label: 'State Management', text: 'Redux and Context API' },
  { label: 'Backend', text: 'Node.js, Express.js, RESTful APIs, JWT Authentication, RBAC' },
  { label: 'Testing', text: 'Jest, React Testing Library' },
  { label: 'Methodologies', text: 'Agile/Scrum, CI/CD' },
  { label: 'Database', text: 'MongoDB(Indexing, Aggregation), Database Schema Design' }
];

skills.forEach(skill => {
  doc.font('Bold').fontSize(10).fillColor(primaryColor).text(`• ${skill.label}: `, { continued: true });
  doc.font('Regular').fillColor(secondaryColor).text(skill.text);
});
doc.moveDown(1);

// --- EXPERIENCE ---
addSectionHeader('Experience');

function addExperience(title, company, date, bullets) {
  doc.font('Bold').fontSize(11).fillColor(primaryColor).text(`${title} | `, { continued: true })
     .fillColor(accentColor).text(company, { continued: true })
     .fillColor(secondaryColor).text(`   ${date}`, { align: 'right' });
  
  doc.moveDown(0.3);
  doc.font('Regular').fontSize(10).fillColor(secondaryColor);
  
  bullets.forEach(b => {
    doc.text(`   • ${b}`, { align: 'justify', lineHeight: 1.3 });
  });
  doc.moveDown(0.8);
}

addExperience(
  'Senior Full Stack Developer', 
  'TechCorp Solutions', 
  'Sep 2024 – Present', 
  [
    'Led development and maintainece of production-grade MERN applications serving 150K+ daily active users, ensuring 99.9% uptime with proactive monitoring and production issue resolution.',
    'Architected and implemented a reusable component library using React, TypeScript, and Storybook, reducing development time by 45% and improving code consistency in projects.',
    'Optimized application performance by implementing code splitting, lazy loading, and memoization techniques, achieving 35% improvement in load times and 28% reduction in bundle size.',
    'Implemented Redux Toolkit for state management, reducing boilerplate code by 55% and improving state management efficiency across applications.',
    'Designed optimized MongoDB schemas and implemented indexing strategies improving API response time by 30%.',
    'Built and maintained secure RESTful APIs using Node.js and Express.js with JWT-based authentication and RBAC.',
    'Collaborated with cross-functional teams including QA and DevOps to ensure smooth production deployments.'
  ]
);

addExperience(
  'Full Stack Developer', 
  'Suthra Technologies', 
  'Feb 2024 – Aug 2024', 
  [
    'Developed and delivered ent-to-end features for a fintech banking platform using the MERN stack.',
    'Developed and maintained front-end modules for NBFC banking web application using React.js, JavaScript (ES6+), HTML5, CSS3 and Material UI.',
    'Implemented key features such as loan application workflows, account dashboard, and user authentication screens improving customer onboarding efficiency.',
    'Integrated REST APIs for transaction history, loan status tracking, and payment details with proper error handling and realtime UI updates.',
    'Improved UI performance by optimizing rendering and implementing reusable components, reducing redundant code and improving maintainability.',
    'Reduced feature delivery time by 20% by building reusable UI components.'
  ]
);

addExperience(
  'Full Stack Developer', 
  'Digital Innovations Inc.', 
  'May 2022 – Jan 2024', 
  [
    'Developed and integrated full-stack modules using React.js, Node.js, Express.js and MongoDB.',
    'Used Git and GitHub for version control and worked closely with QA to resolve UI issues.',
    'Implemented responsive designs using CSS Grid, Flexbox, and media queries, achieving 100% mobile compatibility and improving mobile user engagement by 25%.',
    'Integrated front-end with back-end services ensuring efficient data flow and error handling.',
    'Wrote comprehensive unit tests using Jest and React Testing Library, achieving 85% code coverage and reducing production bugs by 50%.'
  ]
);

// --- EDUCATION ---
addSectionHeader('Education');
doc.font('Bold').fontSize(11).fillColor(primaryColor)
   .text('Sir C R Reddy College of Engineering', { continued: true })
   .font('Regular').fontSize(10).fillColor(secondaryColor)
   .text('   Eluru, AP', { align: 'right' });

doc.font('Bold').fontSize(10).fillColor(secondaryColor)
   .text('B. Tech | Mechanical Engineering', { continued: true })
   .font('Regular')
   .text('   2017 - 2022', { align: 'right' });

doc.end();
console.log(`Generated perfectly formatted resume at ${outputPath}`);
