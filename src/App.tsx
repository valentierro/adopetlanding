import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { ForWho } from './sections/ForWho';
import { Partners } from './sections/Partners';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ForWho />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
}
