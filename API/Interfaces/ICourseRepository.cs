using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICourseRepository
    {
         Task<IEnumerable<CourseDto>> GetCoursesAsync();
         void AddAsync(Course course);
         void AddUserCourseAsync(AppUserCourse userCourse);
         void RemoveUserCourseAsync(AppUserCourse userCourse);
         Task<bool> UserCourseExistsAsync(AppUserCourse userCourse);
         Task<IEnumerable<AppUserCourseDto>> GetTakenCoursesAsync(string userName);
         Task<IEnumerable<Course>> GetCourseAsync(string subjectcode);
         Task<Course> GetCourseByIdAsync(int coursId);
         Task<int> GetCourseStudentCountAsync(int coursId, string username);
         Task<AppUserCourse> GetUserCourseAsync(AppUserCourse userCourse);
         void Update(Course course);
    }
}