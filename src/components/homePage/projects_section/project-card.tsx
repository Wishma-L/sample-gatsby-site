import React from 'react'
// import { colorInverter } from '../../../utils/color-inverter'

type ProjectCardProps = {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageSrc = project.bgImage?.file.url
    ? `https://${project.bgImage.file.url}`
    : `unset`

  const bgImageStyle = {
    backgroundImage: `url(${imageSrc})`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    justifyContent: `start`,
    alignContent: `end`,
  }

  const bgColorStyle = {
    backgroundColor: `${project.bgColor}`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    justifyContent: `start`,
    alignContent: `end`,
  }

  return (
    <>
      <div
        className={`py-4 mx-auto bg-white shadow-md`}
        style={project.bgColor === null ? bgImageStyle : bgColorStyle}
      >
        <p
          className={`px-4 block text-2xl font-bold text-[${project.txtColor}]`}
        >
          {project.title}
        </p>
        <div className="mt-2">
          <p className={`px-4 mt-2 text-[${project.txtColor}]`}>
            {project.description}
          </p>
        </div>
        <div className="px-4 flex items-center justify-between mt-4">
          <a
            className={`bg-[${project.bgColor}] hover:bg-white text-[${project.txtColor}] font-semibold hover:text-[${project.txtColor}] py-2 px-4 border border-[${project.txtColor}] hover:border-black rounded-full no-underline`}
            href={project.link}
          >
            Read more
          </a>
        </div>
      </div>
    </>
  )
}

export default ProjectCard
