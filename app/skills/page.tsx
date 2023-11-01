import Image from "next/image";
import { client } from "../lib/sanity";
interface Data {
  name: string;
  _id: string;
  imageUrl: string;
}

const getSkills = async () => {
  const query = `*[_type == 'skills'] {
    name,
    _id,
    'imageUrl': skillLogo.asset->url
  }`;

  const data = await client.fetch(query);

  return data;
};

export const revalidate = 60;

const Skills = async () => {
  const data: Data[] = await getSkills();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Skills
        </h1>
      </div>
      <div
        style={{
          placeItems: "center",
        }}
        className="grid skills gap-y-8 sm:gap-2 md:gap-6 lg:gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-8"
      >
        {data.map((project) => (
          <div key={project._id} className="">
            <div className="h-20 w-20 img relative rounded-full overflow-hidden">
              <Image
                layout="fill"
                objectFit="cover"
                src={project.imageUrl}
                alt={project.name}
              />
            </div>
            <p className="text-center">{project.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
