export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export interface  OneProduct {
  _id: string,
  user: {
    username: string,
    displayName: string,
    phoneNumber: string,
  },
  category: {
    "title": string
  },
  title: string,
  description: string
  image: string,
  price: number,
}
// export interface IPost {
//   post: {
//     _id: string;
//     user: {
//       username: string;
//     };
//     title: string;
//     description: string;
//     image: File | null;
//     datetime: Date;
//   };
//   commentNumber: number;
// }
//
// export interface IDetailedPost {
//   _id: string;
//   user: {
//     username: string;
//   };
//   title: string;
//   description: string;
//   image: File | null;
//   datetime: Date;
// }
//
// export interface IPostMutation {
//   title: string;
//   description: string;
//   image: File | null;
// }
//
// export interface IComment {
//   _id: string;
//   user: User;
//   post: IPost;
//   text: string;
// }

