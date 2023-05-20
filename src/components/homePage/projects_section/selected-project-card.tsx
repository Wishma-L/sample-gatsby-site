import React from 'react'
import { colorInverter } from '../../../utils/color-inverter'

type SelectedProjectCardProps = {
  project?: Project
}

const SelectedProjectCard = ({ project }: SelectedProjectCardProps) => {

  const imageSrc = project?.bgImage?.file.url ? `https://${project.bgImage.file.url}` : `unset`

  const bgImageStyle = {
    backgroundImage: `url(${imageSrc})`, //`${project.bgImage}`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    justifyContent: `start`,
    alignContent: `end`,
    
  }

  const bgColorStyle = {
    backgroundColor: `${project?.bgColor}`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    justifyContent: `start`,
    alignContent: `end`,
  }
  return (
    <>
      <div className={`py-4 mr-4 bg-white shadow-md p-8 h-[32rem] w-2/3 justify-between`} style={project?.bgColor === null ? bgImageStyle : bgColorStyle} >
        <p className={`block text-2xl font-bold text-[${colorInverter(project?.bgColor ?? '#000000')}]`}>{project?.title}</p>
        <div className="mt-2">
          <p className={`mt-2 text-[${colorInverter(project?.bgColor ?? '#000000')}]`}>{project?.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a className={`bg-${project?.bgColor} hover:bg-white text-[${colorInverter(project?.bgColor ?? '#000000')}] font-semibold hover:text-[${colorInverter(project?.bgColor ?? '#000000')}] py-2 px-4 border border-black hover:border-black rounded-full no-underline`} href={project?.link}>Read more</a>
        </div>
      </div>
    </>
  )
}

export default SelectedProjectCard
