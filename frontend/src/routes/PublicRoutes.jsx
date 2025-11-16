import { Routes, Route } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

// Public Pages (will create next)
import Home from '@pages/public/Home';
import About from '@pages/public/About';
import Academics from '@pages/public/Academics';
import Admissions from '@pages/public/Admissions';
import Gallery from '@pages/public/Gallery';
import Facilities from '@pages/public/Facilities';
import Contact from '@pages/public/Contact';
import Events from '@pages/public/Events';
import NotFound from '@pages/public/NotFound';

const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default PublicRoutes;
