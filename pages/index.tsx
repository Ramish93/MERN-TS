import type { NextPage } from 'next'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Spinner from './components/Spinner/Spinner'
import Card from './components/Card/Card'
import Grid from './components/Grid/Grid'


const Home: NextPage = () => {
  return (
    <main className='relative h-screen overflow-y-scroll ' >
      <Header />
      <Hero />
      <Grid />
      <Card />
      <Spinner />
     </main>
  )
}

export default Home
