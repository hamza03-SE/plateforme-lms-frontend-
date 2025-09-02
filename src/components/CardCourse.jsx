function CardCourse({ course }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <span className="text-sm text-gray-400">{course.instructor}</span>
    </div>
  );
}

export default CardCourse;
