import { EPostType } from './../@types/enums';


export interface PostType {
  type: EPostType
}

export interface State {
  postType: PostType
}
