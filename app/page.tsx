import ParagraphSlider from "./components/ParagraphSlider";
import Typewriter from "./components/TypeWriter";
import ImageSwitcher from "./components/ImageSwitcher";
import Resume from "./components/Resume";
export default function Home() {
  const paragraphs = [
    "I am a dedicated and versatile software developer passionate about crafting innovative solutions. With a strong foundation in web development and proficiency in technologies like ReactJS, Next.js, GraphQL, SASS, and Azure DevOps, I excel in creating user-centric applications.",
    "My experience at Accenture provided exposure to various aspects of software development, from building component libraries to effectively using Bit.dev for component management and versioning. Emphasizing clean, maintainable code, I am committed to learning the latest technology trends for efficient solutions.",
    "Collaboration, problem-solving, and adaptability are integral to my approach, ensuring seamless integration within cross-functional teams. Proficiency in Figma and leveraging CMS like Contentful have been instrumental in content-driven application design and management.",
    "I am motivated by excellence in crafting engaging user experiences and eagerly seek challenges in the ever-evolving landscape of software development.",
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
            <ImageSwitcher />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              <Typewriter text="Ayush Das" delay={100} />
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              <Typewriter text="Full Stack Developer" delay={100} />
            </p>
            <div className="flex space-x-5 pt-6">
              <a href="https://github.com/iamayushdas" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/iamayushdas/"
                target="_blank"
              >
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              <a href="mailto:ayush24das+portfolio@gmail.com" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
                </svg>
              </a>
              <a href="https://twitter.com/imayushdas" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                  clip-rule="evenodd"
                  baseProfile="basic"
                >
                  <polygon
                    fill="currentColor"
                    points="41,6 9.929,42 6.215,42 37.287,6"
                  />
                  <polygon
                    fill="transparent"
                    fill-rule="evenodd"
                    points="31.143,41 7.82,7 16.777,7 40.1,41"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M15.724,9l20.578,30h-4.106L11.618,9H15.724 M17.304,6H5.922l24.694,36h11.382L17.304,6L17.304,6z"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCLmwMq9ceEs0XjdjoTutKRw"
                target="_blank"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/iamayushdas/" target="_blank">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="w-8 h-8 text-teal-500 hover:text-teal-600"
                >
                  <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 00-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z" />
                </svg>
              </a>
            </div>
            <Resume />
          </div>
          <ParagraphSlider paragraphs={paragraphs} />
        </div>
      </div>
    </>
  );
}
