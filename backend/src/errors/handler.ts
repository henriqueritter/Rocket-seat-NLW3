//para tratar os erros do Express/async/await
import { ErrorRequestHandler } from "express";

//para tratar os erros de validacao do YUP
import { ValidationError } from "yup";

//define o tipo do objeto a ser retornado
interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  //se o erro for uma instancia dos erros do YUP
  if (error instanceof ValidationError) {
    //cria a var do tipo da interface criada acima como um objeto vazio
    let errors: ValidationErrors = {};

    //para cada erro dentro do ERROR existe este hack que devolve coloca o erro dentro
    //do objeto criado acima
    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: "Validation fails", errors });
  }

  console.error(error);

  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
