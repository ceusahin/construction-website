const RecentProjects = ({ projects }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">📝 Son Eklenen Projeler</h3>
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li key={index} className="border-b pb-2">
            <p className="font-bold">{project.name}</p>
            <p className="text-sm text-gray-600">
              Başlangıç: {project.startDate} — Durum: {project.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentProjects;
