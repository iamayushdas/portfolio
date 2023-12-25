import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "./interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getBlogs() {
  const query = `
    *[_type=='blog'] | order(_createdAt desc) {
        title,
          smallDescription,
          "currentSlug": slug.current,
          titleImage
    }`;

  const blogs = await client.fetch(query);

  return blogs;
}
const Blog = async () => {
  const data: simpleBlogCard[] = await getBlogs();
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className=" pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          My Blogs
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-5 gap-5">
        {data.map((post, idx) => (
          <Card key={idx} className="bg-transparent">
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-[200px] object-cover"
            />
            <CardContent className="mt-5">
                <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                <p className="line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
                <Button asChild className="w-full mt-7 bg-teal-500 dark:bg-teal-800 text-neutral-900 dark:text-neutral-100 font-semibold p-3 rounded focus:outline-none focus:bg-teal-500 focus:text-white hover:bg-teal-100">
                    <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
