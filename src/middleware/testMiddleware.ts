import { MiddlewareFn } from "type-graphql";

const testMiddleware: MiddlewareFn<any> = async ({ context }, next) => {
    console.log(context);
  return next();
}

export default testMiddleware;
