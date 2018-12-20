import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MovieModal } from './movie-modal';

jest.mock('../actions/movies-action', () => Object.assign({},
  require.requireActual('../actions/movies-action'),
  {
    fetchOmdbInfo: jest.fn().mockImplementation((imdbID) => {
      return {
        type: 'LOGIN',
        imdbID
      };
    })
  }));

describe('<MovieModal/>', () => {
  const dispatch = jest.fn();
  const movieInfo = {
    'Title': 'Nightcrawler',
    'Year': '2014',
    'Rated': 'R',
    'Released': '31 Oct 2014',
    'Runtime': '117 min',
    'Genre': 'Crime, Drama, Thriller',
    'Director': 'Dan Gilroy',
    'Writer': 'Dan Gilroy',
    'Actors': 'Jake Gyllenhaal, Michael Papajohn, Marco Rodríguez, Bill Paxton',
    'Plot': 'When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant to become the star of his own story.',
    'Language': 'English',
    'Country': 'USA',
    'Awards': 'Nominated for 1 Oscar. Another 43 wins & 120 nominations.',
    'Poster': 'https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    'Ratings': [
      {
        'Source': 'Internet Movie Database',
        'Value': '7.9/10'
      },
      {
        'Source': 'Rotten Tomatoes',
        'Value': '95%'
      },
      {
        'Source': 'Metacritic',
        'Value': '76/100'
      }
    ],
    'Metascore': '76',
    'imdbRating': '7.9',
    'imdbVotes': '385,373',
    'imdbID': 'tt2872718',
    'Type': 'movie',
    'DVD': '10 Feb 2015',
    'BoxOffice': 'N/A',
    'Production': 'Open Road Films',
    'Website': 'http://nightcrawlerfilm.com/',
    'Response': 'True'
  };
  const movie = {
    poster: 'https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    title: 'Nightcrawler',
    imdbID: 'tt2872718'
  }
  it('should render without crashing', () => {
    mount(<BrowserRouter>
      <MovieModal movieInfo={movieInfo} dispatch={dispatch} movie={movie}/>
    </BrowserRouter>);
  });
  // it('should dispatch fetchOmdbInfo on click', () => {
  //   const wrapper = mount(<BrowserRouter>
  //     <MovieModal movieInfo={movieInfo} dispatch={dispatch} movie={movie}/>
  //   </BrowserRouter>);
  //   const image = wrapper.find('.match-movie-poster');
  //   image.simulate('click');
  //   expect(dispatch).toHaveBeenCalledWith({
  //     type: 'LOGIN',
  //     imdbID: movie.imdbID
  //   });
  // });
});