import Image from "next/image";
import { client } from "../lib/sanity";

type Skill = {
  category: any;
  name: string;
  _id: string;
  imageUrl: string;
};

interface Props {
  data: Skill[];
}

const getSkills = async () => {
  const query = `*[_type == 'skills'] {
    name,
    _id,
    'imageUrl': skillLogo.asset->url,
    category
  }`;

  const data = await client.fetch(query);

  return data;
};

export const revalidate = 60;

const Skills: React.FC<Props> = async () => {
  const data: Skill[] = await getSkills();

  const categorizedSkills: { [key: string]: Skill[] } = data.reduce(
    (categorizedSkills: any, project) => {
      if (!categorizedSkills[project.category]) {
        categorizedSkills[project.category] = [];
      }
      categorizedSkills[project.category].push(project);
      return categorizedSkills;
    },
    {}
  );
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className=" pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Skills
        </h1>
      </div>
      <div>
        {Object.keys(categorizedSkills).map((category, index) => (
          <div key={index} style={{ margin: "15px 0", borderBottom: '1px solid #e5e7eb', paddingBottom:'15px'  }}>
            <h2 className=" space-y-2 text-2xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
                gap: "8%"
              }}
            >
             {categorizedSkills[category].map((skill) => (
              <div
                key={skill._id}
                className="skillLogo"
                style={{ textAlign: 'center' }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={skill.imageUrl}
                    alt={skill.name}
                  />
                </div>
                <p style={{marginBottom:"20px"}}>{skill.name}</p>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
