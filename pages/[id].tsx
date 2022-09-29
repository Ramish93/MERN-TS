import { movieUrl, creditsUrl, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';
// Basic fetch
import { basicFetch } from '../api/fetchFunctions';
// Components
import Header from '../components/Header/Header';
import BreadCrumb from '../components/Breadcrumb/Breadcrumb';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
// Types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Movie, Credits, Crew, Cast } from '../api/types';


type Props = {
    movie: Movie,
    directors: Crew[],
    cast: Cast[],
}

const Movie: NextPage<Props> = ({movie, cast, directors}) => (
    <main>
        <Header />
        <BreadCrumb title={movie.original_title} />
        <MovieInfo />
        <Grid>
            <Card />

        </Grid>
    </main>
)

export default Movie


export const getStaticProps: GetStaticProps = async context => {
    const id = context.params?.id as string;
  
    const movieEndpoint: string = movieUrl(id);
    const creditsEndpoint: string = creditsUrl(id);
  
    const movie = await basicFetch<Movie>(movieEndpoint);
    const credits = await basicFetch<Credits>(creditsEndpoint);
  
    // Get the directors only
    const directors = credits.crew.filter(member => member.job === 'Director');
  
    return {
      props: {
        movie,
        directors,
        cast: credits.cast
      },
      revalidate: 60 * 60 * 24 // Re-build page every 24 hours
    };
  };
  
  export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: 'blocking'
    };
  };