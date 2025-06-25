import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();

  return <h2> Vue détaillée du projet {id}</h2>;
}

export default ProjectDetail;
