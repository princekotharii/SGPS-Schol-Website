frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── logo.png
│   └── images/
│       ├── hero-bg.jpg
│       ├── about-bg.jpg
│       └── placeholders/
│
├── src/
│   ├── api/
│   │   ├── axios.js                    # Axios configuration
│   │   └── endpoints.js                # API endpoint functions
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   └── default-avatar.png
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.css
│   │   │   ├── Sidebar.jsx             # Admin sidebar
│   │   │   └── Sidebar.module.css
│   │   │
│   │   ├── shared/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   ├── Card.jsx
│   │   │   ├── Card.module.css
│   │   │   ├── PageHeader.jsx
│   │   │   ├── PageHeader.module.css
│   │   │   ├── Loader.jsx
│   │   │   ├── Loader.module.css
│   │   │   ├── Modal.jsx
│   │   │   ├── Modal.module.css
│   │   │   ├── Table.jsx
│   │   │   └── Table.module.css
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.module.css
│   │   │   ├── Stats.jsx
│   │   │   ├── Stats.module.css
│   │   │   ├── Features.jsx
│   │   │   ├── Features.module.css
│   │   │   ├── CTASection.jsx
│   │   │   └── CTASection.module.css
│   │   │
│   │   ├── forms/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactForm.module.css
│   │   │   ├── AdmissionForm.jsx
│   │   │   ├── AdmissionForm.module.css
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.module.css
│   │   │
│   │   └── admin/
│   │       ├── DashboardCard.jsx
│   │       ├── DashboardCard.module.css
│   │       ├── DataTable.jsx
│   │       ├── DataTable.module.css
│   │       ├── ImageUpload.jsx
│   │       ├── ImageUpload.module.css
│   │       ├── GalleryForm.jsx
│   │       ├── GalleryForm.module.css
│   │       ├── EventForm.jsx
│   │       └── EventForm.module.css
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.module.css
│   │   │   ├── About.jsx
│   │   │   ├── About.module.css
│   │   │   ├── Academics.jsx
│   │   │   ├── Academics.module.css
│   │   │   ├── Admissions.jsx
│   │   │   ├── Admissions.module.css
│   │   │   ├── Gallery.jsx
│   │   │   ├── Gallery.module.css
│   │   │   ├── Facilities.jsx
│   │   │   ├── Facilities.module.css
│   │   │   ├── Contact.jsx
│   │   │   ├── Contact.module.css
│   │   │   ├── Events.jsx
│   │   │   ├── Events.module.css
│   │   │   ├── NotFound.jsx
│   │   │   └── NotFound.module.css
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.module.css
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ForgotPassword.module.css
│   │   │
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── Dashboard.module.css
│   │       ├── GalleryManagement.jsx
│   │       ├── GalleryManagement.module.css
│   │       ├── EventManagement.jsx
│   │       ├── EventManagement.module.css
│   │       ├── AdmissionManagement.jsx
│   │       ├── AdmissionManagement.module.css
│   │       ├── ContactManagement.jsx
│   │       ├── ContactManagement.module.css
│   │       ├── UserManagement.jsx
│   │       ├── UserManagement.module.css
│   │       ├── Profile.jsx
│   │       └── Profile.module.css
│   │
│   ├── routes/
│   │   ├── PublicRoutes.jsx           # Public route wrapper
│   │   ├── AdminRoutes.jsx            # Admin route wrapper
│   │   ├── PrivateRoute.jsx           # Protected route component
│   │   └── index.jsx                  # Main routes configuration
│   │
│   ├── context/
│   │   ├── AuthContext.jsx            # Authentication context
│   │   └── ThemeContext.jsx           # Optional: Theme context
│   │
│   ├── hooks/
│   │   ├── useAuth.js                 # Authentication hook
│   │   ├── useAPI.js                  # API calling hook
│   │   ├── usePagination.js           # Pagination hook
│   │   └── useForm.js                 # Form validation hook
│   │
│   ├── utils/
│   │   ├── constants.js               # App constants
│   │   ├── helpers.js                 # Helper functions
│   │   └── validators.js              # Form validators
│   │
│   ├── data/
│   │   ├── stats.js                   # School statistics data
│   │   ├── features.js                # Features data
│   │   ├── programs.js                # Programs data
│   │   ├── subjects.js                # Subjects data
│   │   ├── facilities.js              # Facilities data
│   │   ├── leadership.js              # Leadership team data
│   │   ├── navLinks.js                # Navigation links
│   │   └── socialLinks.js             # Social media links
│   │
│   ├── styles/
│   │   ├── index.css                  # Global styles
│   │   ├── variables.css              # CSS variables (colors, fonts, etc.)
│   │   ├── reset.css                  # CSS reset
│   │   ├── typography.css             # Typography styles
│   │   ├── animations.css             # Animation keyframes
│   │   ├── utilities.css              # Utility classes
│   │   └── responsive.css             # Responsive breakpoints
│   │
│   ├── App.jsx                        # Main App component
│   ├── App.css                        # App specific styles
│   └── main.jsx                       # Entry point
│
├── .env                                # Environment variables
├── .env.example                        # Environment variables example
├── .gitignore                          # Git ignore file
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
├── jsconfig.json                       # Path aliases configuration
└── README.md                           # Project documentation