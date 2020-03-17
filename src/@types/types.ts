export interface IError {
  error: boolean | undefined;
}

export interface IInput {
  type: string;
}


export interface IUser {
  email: string;
  name: string;
}

export interface IPost {
  imgUrl: string;
  created_by: string;
  created_at: string;
  likes: string[];
  sent: string[];
  waitingForAnswer: string[];
  comments: Comment[];
}

export interface Comment {
  user: string;
  comment: string;
}
