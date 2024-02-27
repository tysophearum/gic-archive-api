import { MiddlewareFn } from "type-graphql";

const testMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
  let token = context.authorization;

  if (token.startsWith("Bearer ")){
    token = token.substring(7, token.length);
  }
  console.log(token);
  
  return next();
}

export default testMiddleware;
