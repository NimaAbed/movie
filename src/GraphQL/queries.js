
import { gql } from "@apollo/client"
const GET_MOVIES_HOME = gql`
query getMovies( $first:Int! $slug:String!){
  category(where:{slug:$slug}){
    movies(orderBy: createdAt_DESC, first: $first) {
      id
      name
      coverPhoto{url}
      slug
      
    }
  }
}
`
const GET_MOVIES_PAGE = gql`
query getMovies( $slug:String!,$first:Int!,$skip:Int!){
  category(where:{slug:$slug}){
    name
    movies(orderBy: createdAt_DESC,first:$first,skip:$skip) {
      id
      name
      coverPhoto{url}
      slug
      
    }
  }
}
`
const GET_ALL_MOVIES = gql`
query allMovies($slug:String!){
  category(where:{slug:$slug}){
    movies(first:500){name}
  }
}
`
const GET_MOVIE = gql`
query getMovie($slug:String!){
  movie(where:{slug:$slug}){
    coverPhoto{url}
    name,
    about
    seasons {
      id
      season
      episodes(first:200){
        id,episode,media{url},endEpisode
      }
    }
    comments {
      id
    }
    episodes(first:200) {
      id
      episode
      endEpisode
      media{url}
    }
  }
}
`
const GET_PEOPLE = gql`
query people($email:String!){
  people(where:{email:$email}){name,email}
}
`

const GET_DATA_LOGIN = gql`
query dataUser($email:String!,$password:String!){
  people(where:{email:$email,password:$password}){
    name,email,avatar{url}
  }
}
`
const GET_COMMENTS = gql`
query MyQuery($slug:String!) {
  comments(where: {movie: {slug:$slug}}){
    name,
    text,
    id
  }
}
`

const SEARCH_MOVIES = gql`
query searchMovies($search:String!){
  movies(where:{_search:$search}) {
    id
    name
    coverPhoto{url}
    slug
  }
}
`

export { GET_MOVIES_HOME, GET_MOVIES_PAGE, GET_PEOPLE, GET_DATA_LOGIN, GET_MOVIE, GET_ALL_MOVIES, GET_COMMENTS, SEARCH_MOVIES }