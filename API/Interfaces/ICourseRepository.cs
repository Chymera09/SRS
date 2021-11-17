using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
         Task<IEnumerable<Course>> GetCoursesAsync();
         void Add(Course course);
         Task<IEnumerable<Course>> GetCourseAsync(string subjectcode);
    }
}