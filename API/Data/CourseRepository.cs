using System.Collections.Generic;
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

        public async Task<IEnumerable<Course>> GetCoursessAsync()
        {
             return await _context.Courses
                .ToListAsync();
        }
    }
}