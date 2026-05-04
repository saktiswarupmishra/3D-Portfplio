import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import { projects } from '../data/projects'

export default function ProjectsSection() {
  const sectionRef = useIntersectionObserver('projects', 0.2)

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-content">
        <SectionHeader title="Projects" subtitle="What I've Built" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
      <ProjectModal />
    </section>
  )
}
