using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public CourseRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }            

        public async void AddAsync(Course course)
        {
            await _context.Courses.AddAsync(course);
        }

        public async void AddUserCourseAsync(AppUserCourse userCourse)
        {
            await _context.AppUserCourse.AddAsync(userCourse);
        }

        public void RemoveUserCourseAsync(AppUserCourse userCourse)
        {
            _context.AppUserCourse.Remove(userCourse);
        }

        public async Task<bool> UserCourseExistsAsync(AppUserCourse userCourse)
        {
            return await _context.AppUserCourse
                .Where(x => x.Course == userCourse.Course && x.User == userCourse.User)
                .CountAsync() != 0;
        }

        public async Task<IEnumerable<AppUserCourseDto>> GetTakenCoursesAsync(string userName)
        {
            return await _context.AppUserCourse
                .Where(x => x.User.UserName == userName)
                .Select(x => new AppUserCourseDto{CourseId = x.Course.Id})
                .ToListAsync();
        }

        public async Task<AppUserCourse> GetUserCourseAsync(AppUserCourse userCourse)
        {
            return await _context.AppUserCourse
                .Where(x => x.Course == userCourse.Course && x.User == userCourse.User)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<CourseDto>> GetCoursesAsync()
        {
            return await _context.Courses
                .Include(s => s.Subject)
                .Select(x => new CourseDto
                {
                    Id = x.Id,
                    Type = x.Type,
                    StartTime = x.StartTime,
                    EndTime = x.EndTime,
                    Limit = x.Limit,
                    Code = x.Subject.Code,
                    Username = x.Lecturer.UserName
                })
                .ToListAsync();        
        }

        public async Task<IEnumerable<Course>> GetCourseAsync(string subjectcode)
        {
             return await _context.Courses
                // .Include(x => x.Subject)
                .Where(x => x.Subject.Code == subjectcode)
                .ToListAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int coursId)
        {
             return await _context.Courses
                .Where(x => x.Id == coursId)
                .FirstOrDefaultAsync();
        }

        public async Task<int> GetCourseStudentCountAsync(int coursId, string username)
        {
             return await _context.AppUserCourse
                .Where(x => x.Course.Id == coursId && x.User.UserName == username)
                .CountAsync();
        }

        public void Update(Course course)
        {
            _context.Entry(course).State = EntityState.Modified;
        }
    }
}