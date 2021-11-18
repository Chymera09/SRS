using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
         Task<IEnumerable<CourseDto>> GetCoursesAsync();
         void Add(Course course);
         Task<IEnumerable<Course>> GetCourseAsync(string subjectcode);
         void Update(Course course);
    }
}