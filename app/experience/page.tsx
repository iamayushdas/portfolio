import Image from "next/image";
import { client } from "../lib/sanity";
import ExperienceDescription from "../components/DescriptionToggle";
import FloatingSocialHandle from "../components/FloatingSocialHandle";
interface Data {
  title: string;
  company: string;
  companyLogo: string;
  startDate: string;
  endDate: string;
  description: string;
}

const getExperiences = async () => {
  const query = `*[_type == 'experience'] {
    title,
    company,
    'companyLogo': companyLogo.asset->url,
    startDate,
    endDate,
    description
  }`;

  const data = await client.fetch(query);

  return data;
};

export const revalidate = 60;

const Experience = async () => {
  const experiences: Data[] = await getExperiences();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4x sm:leading-10 md:text-6xl md:leading-14">
          Experience
        </h1>
      </div>
      <FloatingSocialHandle />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {experiences.map((experience, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <div className="flex flex-col items-center mb-3">
              {/* <div className="h-12 w-12 overflow-hidden rounded-full mr-4"> */}
              <div className="relative w-full h-10">
                <Image
                  src={experience.companyLogo}
                  alt={experience.company}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* </div> */}
              <h2 className="text-lg font-semibold">{experience.title}</h2>
            </div>
            <p>
              <span className="font-semibold">Company:</span>{" "}
              {experience.company}
            </p>
            <p>
              <span className="font-semibold">Period:</span>{" "}
              {experience.startDate} -{" "}
              {experience.endDate ? experience.endDate : "current"}
            </p>
            {/* <p className="mt-2">{experience.description}</p> */}
            <ExperienceDescription description={experience.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
