import { QuestionObject, PathType } from "../types";
export const parseStep = (currentQuestion: QuestionObject, message: string) => {
  const type = typeof(currentQuestion.validation);
  if ( type === 'boolean' ) {
    if ( !currentQuestion.validation || !message.length ) {
        return 0;
    }
    return currentQuestion.paths;
  } else if ( type === 'object' ) {
    const option = message.toLowerCase();
    const validations = currentQuestion.validation as string[];
    let match = validations.filter((validation) => validation === option)
    if ( !match.length ) {
      return 0;
    }
    match = validations.filter((validation) => validation === 'yes')
    if ( match.length ) {
      const paths = currentQuestion.paths as PathType;
      return paths[option];
    }
    return currentQuestion.paths;
  } else if ( type === 'string' ) {
    const regString = currentQuestion.validation as string;
    const re = new RegExp(regString);
    if ( !re.test(message) ) {
        return 0;
    }
    return currentQuestion.paths;  
  }
  return 0;
}

export const normalize = (array: any[], key: string) => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, {});
};

export const isEmptyObject = (obj: any) => {
  return JSON.stringify(obj) === '{}';
}