export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  userId?: number;
  title: string;
}

export interface IPostWithUserAndComments extends IPost {
  user: IUser;
  comments: IComment[];
}

