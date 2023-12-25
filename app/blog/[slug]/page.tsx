import { client, urlFor } from "@/app/lib/sanity";
import { blog } from "./interface";
import { ChevronLeftCircle, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "./BackButton";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getBlog(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]
    `;

  const data = await client.fetch(query);
  return data;
}
export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const blog: blog = await getBlog(params.slug);

  return (
    <div className="mt-8 grid place-items-center">
      <h1>
        <span className="mt-2 pr-8 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl sm:m-0">
          <BackButton />
          {blog.title}
        </span>
      </h1>
      <Image src={urlFor(blog.titleImage).url()} priority width={800} height={800} alt="titleImage" className="rounded-lg mt-8 border"/>
      <div className="mt-16 prose prose-teal prose-xl dark:prose-invert">
            <PortableText value={blog.content} />
      </div>
    </div>
  );
}
