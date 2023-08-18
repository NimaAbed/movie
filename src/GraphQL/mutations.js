import { gql } from "@apollo/client";

const CREATE_PERSON = gql`
mutation getData($name:String! $email:String! $password:String!){
  createPerson(data:{name:$name,email:$email,password:$password}){
    name,email
  }
}
`
const CREATE_COMMENT = gql`
mutation cComment($name:String! $email:String! $text:String! $slug:String!){
  createComment(
    data: {name: $name, email: $email, text: $text, movie: {connect: {slug: $slug}}}
  ) {
    id
  }
}
`

export { CREATE_PERSON, CREATE_COMMENT }