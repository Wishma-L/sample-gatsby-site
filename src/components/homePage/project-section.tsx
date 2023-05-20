import React from 'react'
// import { colorInverter } from '../../utils/color-inverter'
import ProjectCard from './projects_section/project-card'
import SelectedProjectCard from './projects_section/selected-project-card'

type ProjectsSectionProps = {
  data: Project[]
}

export const ProjectsSection = ({ data }: ProjectsSectionProps) => {
  const highlightProject = data.find((project) => {
    return project.isHighlighted === true
  })

  const restOfProjects = data.filter((project) => {
    return project.isHighlighted === false
  })

  return (
    <>
      <h1 className="font-semibold text-4xl pl-8 pt-8 pb-8">Our Projects</h1>
      <div className="flex items-center py-3 p-8">
        <SelectedProjectCard project={highlightProject} />
        <div className="w-1/3 ml-2 h-[32rem] flex flex-col justify-between">
          {restOfProjects.map((project) => {
            return (
              <div key={project.id} className="">
                <ProjectCard project={project} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
