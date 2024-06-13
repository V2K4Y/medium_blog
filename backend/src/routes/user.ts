import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { singinInput, singupInput } from "@v_k_y/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = singupInput.safeParse(body);

    if(!success) {
      c.status(400);
      return c.json({
        msg: "Invalid input!"
      })
    }

    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
    
        },
        select: {
          id: true,
          email: true,
          name: true,
        }
      })
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        token: jwt,
        user
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //@ts-ignore
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
          return c.json({message: 'Email already exists' }, 400);
        }
      }
      return c.json({msg: "An error occurred!"}, 500)
    }
  
  })
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = singinInput.safeParse(body);
    if(!success) {
      return c.json({
        msg: "Invalid input format!",
      }, 400);
    }
    const user = await prisma.user.findFirst({
      where: {
        password: body.password,
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })
    if(!user)
      return c.json({msg: "Invalid Username or Password!"});
    
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      msg: "Logged In",
      token,
      user
    })
  })

  userRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const id = c.req.query('id') || '';

   try {
     const user = await prisma.user.update({
       where: {
         id
       },
       data: {
         name: body?.name,
         password: body?.password,
         bio: body?.bio,
       }
     })
     return c.json({
       msg: "Updated successfully!",
       username: user.name,
     })
   } catch (error) {
    console.log('Internal server error: ', error);
    return c.json({
      msg: "Something went wrong!",
    })
   }
  })