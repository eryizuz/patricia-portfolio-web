import content from './data/content.json'
import useReveal from './hooks/useReveal'
import SlideNav from './components/SlideNav'
import PaletteSwitch from './components/PaletteSwitch'
import Cover from './components/Cover'
import Toolbox from './components/Toolbox'
import About from './components/About'
import Experience from './components/Experience'
import ContentCreation from './components/ContentCreation'
import Cases from './components/Cases'
import Accounts from './components/Accounts'
import Analytics from './components/Analytics'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useReveal()

  return (
    <>
      <SlideNav count={9} />
      <PaletteSwitch options={content.palette.options} />

      <main>
        <Cover data={content.cover} />
        <Toolbox data={content.toolbox} />
        <About data={content.about} />
        <Experience data={content.experience} />
        <ContentCreation data={content.contentSlide} />
        <Cases data={content.cases} />
        <Accounts data={content.accounts} />
        <Analytics data={content.analytics} />
        <Contact data={content.contact} />
      </main>

      <Footer text={content.footer} />
    </>
  )
}
