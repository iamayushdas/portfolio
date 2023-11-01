import Image from "next/image";
import Me from "@/public/profile-hd.png";
import ParagraphSlider from "./components/ParagraphSlider";
export default function Home() {
  const paragraphs = [
    "I am a dedicated and versatile software developer with a passion for crafting innovative solutions. With a strong foundation in web development and a proficiency in a diverse range of technologies, including ReactJS, Next.js, GraphQL, SASS, and Azure DevOps, I excel in creating scalable, user-centric applications.",
    "My experience at Accenture provided extensive exposure to various aspects of software development, from building composable component libraries and implementing Headless UI components to effectively utilizing Bit.dev for component management and versioning. This emphasized the significance of clean, maintainable code. I am committed to continuous learning, keeping pace with the latest trends in technology to deliver high-quality, efficient solutions.",
    "Collaboration, problem-solving, and adaptability are integral to my approach, ensuring seamless integration within cross-functional teams. My proficiency in Figma and experience in leveraging CMS like Contentful have been instrumental in the design and management of content-driven applications. I am motivated by the pursuit of excellence in crafting engaging user experiences and eagerly seek new challenges in the ever-evolving landscape of software development."
  ];

  return (
    <>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <div className="space-y-2 pt-5 pb-5 md:space-x-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-13">
            Home
          </h1>
        </div>
        <div className="items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-3 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              alt="picture-of-ayush"
              src={Me}
              className="h-48 w-48 rounded-full object-cover object-top"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              Ayush Das
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Full Stack Developer
            </p>
            <div className="flex space-x-5 pt-6">
              <a href="" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 01-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 01-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 00229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" />
                </svg>
              </a>
            </div>
          </div>
          {/* <div className="prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">
            <p>
              I am a dedicated and versatile software developer with a passion
              for crafting innovative solutions. With a strong foundation in web
              development and a proficiency in a diverse range of technologies,
              including
              <span className="text-teal-500 hover:text-teal-600"> ReactJS</span>,
              <span className="text-teal-500 hover:text-teal-600">Next.js</span>,
              <span className="text-teal-500 hover:text-teal-600">GraphQL</span>,
              <span className="text-teal-500 hover:text-teal-600">SASS</span>, and 
              <span className="text-teal-500 hover:text-teal-600">
                 Azure DevOps
              </span>
              , I excel in creating scalable, user-centric applications.
            </p>
            <p>
              My experience at Accenture provided extensive exposure to various
              aspects of software development, from building composable
              component libraries and implementing Headless UI components to
              effectively utilizing
              <span className="text-teal-500 hover:text-teal-600">Bit.dev</span> for
              component management and versioning. This emphasized the
              significance of clean, maintainable code. I am committed to
              continuous learning, keeping pace with the latest trends in
              technology to deliver high-quality, efficient solutions.
            </p>
            <p>
              Collaboration, problem-solving, and adaptability are integral to
              my approach, ensuring seamless integration within cross-functional
              teams. My proficiency in
              <span className="text-teal-500 hover:text-teal-600">Figma</span> and
              experience in leveraging
              <span className="text-teal-500 hover:text-teal-600">
                CMS like Contentful
              </span>
              have been instrumental in the design and management of
              content-driven applications. I am motivated by the pursuit of
              excellence in crafting engaging user experiences and eagerly seek
              new challenges in the ever-evolving landscape of software
              development.
            </p>
          </div> */}
          <ParagraphSlider paragraphs={paragraphs} />
        </div>
      </div>
    </>
  );
}
