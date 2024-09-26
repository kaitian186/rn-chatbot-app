export interface MessageObject {
  key: number,
  sender: UserType,
  context: string,     
}

export interface PathType {
  [key: string]: number,
}

export interface QuestionObject {
  id: number,
  paths: PathType | number, 
  question: string,
  style?: string,
  validation: string | string[] | boolean,
}

export interface QuestionNormalize {
  [key: string]: QuestionObject
}

export enum UserType {
  BOT = 'BOT',
  USER = 'USER'
}