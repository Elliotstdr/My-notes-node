// type Article = {
//     message: String,
//     author: String,
//     likers?: Array<String>,
//     userId: String,
// }

type Page = {
  _id?: String,
  label: String,
  order?: Number,
}

type Sheet = {
  _id?: String,
  label: String,
  page: String,
  order?: Number,
}

type Note = {
  _id?: String,
  title: String,
  content?: String,
  sheet: String,
  order?: Number,
}

type User = {
  _id?: String,
  email: String,
  password: String
}