import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogCreateInput, blogUpdateInput } from "@v_k_y/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
      userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
  const authorizeHeader = c.req.header('authorization');
  const token = authorizeHeader?.split(' ')[1] || " ";
  try {
    const access = await verify(token, c.env.JWT_SECRET);
    c.set("userId", access.id);
    await next();

  } catch (error) {
    c.status(403);
    return c.json({
      msg: "You're not logged In!"
    })
    
  }
})

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();
      const { success } = blogCreateInput.safeParse(body);
      if(!success) return c.json({msg: "Invalid inputs!"})
      const authorId = c.get('userId');
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId,
        }
      });
    
      return c.json({
        msg: "Post created!", 
        postId: post.id
      })

    } catch (error) {
      return c.json({msg: "Internal server error!"})
    }
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = blogUpdateInput.safeParse(body);
    if(!success) return c.json({msg: "Invalid inputs!"})
    try {
      const post = await prisma.post.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
        select: {
          title: true,
        }
      })
      return c.json({msg: "Post Updated!!!"});
    } catch (error) {
      c.status(404);
      return c.json({
        msg: "Not found",
      })
    }
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const posts = await prisma.post.findMany({
        select: {
          id: true, 
          title: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            }
          }
        }
      });
      return c.json({
        posts,
      })
    } catch (error) {
      return c.json({
        msg: "Internal server error!",
      })
    }
  })

  blogRouter.delete('/',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.query('id') || "";
    try {
      const post = await prisma.post.delete({
        where: {
          id,
        }
      })
      return c.json({
        msg: "Deleted",
        post: post.title,
      })
    } catch (error) {
      console.log(error);
      return c.json({
        msg: "Something went wrong!",
      })
    }
  })
  
  blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.query('id') || " ";
    try {
      const post = await prisma.post.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
            }
          }
        }
      })
      if(!post) {
        c.status(404);
        return c.json({
          msg: "Not found"
        })
      }
      return c.json({
        post,
      })
    } catch (error) {
      return c.json({
        msg: "Internal Server error!"
      })
    }
    
  })