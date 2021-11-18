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

        public async void Add(Course course)
        {
            await _context.Courses.AddAsync(course);
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

        public void Update(Course course)
        {
            _context.Entry(course).State = EntityState.Modified;
        }
    }
}