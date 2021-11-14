using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
         Task<IEnumerable<Course>> GetCoursessAsync();
         void Add(Course course);
    }
}