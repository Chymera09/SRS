using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseController : BaseApiController
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly DataContext _context;
        private readonly ISubjectRepository _subjectRepository;
        public CourseController(DataContext context, ICourseRepository courseRepository, ISubjectRepository subjectRepository, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _courseRepository = courseRepository;
            _subjectRepository = subjectRepository;
            _userRepository = userRepository;
            _context = context;
        }

        [HttpGet("courses")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var courses = await _courseRepository.GetCoursessAsync();

            return Ok(courses);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddCourse(CourseDto courseDto)
        {           
            var subject = await _subjectRepository.GetSubjectAsync(courseDto.SubjectCode);
            if(subject == null)
            {
                return BadRequest("Subject cannot find");
            }

            var user = await _userRepository.GetUserByUsernameAsync(courseDto.Username);
            if(user == null)
            {
                return BadRequest("User cannot find");
            }

            var course = new Course
            {
                Type = courseDto.Type,
                StartTime = courseDto.StartTime,
                EndTime = courseDto.EndTime,
                Limit = courseDto.Limit == 0 ? 1 : courseDto.Limit,
                Subject = subject,
                Lecturer = user
            };

            _courseRepository.Add(course);

            var result = await _context.SaveChangesAsync();
            if(result == 0)
            {
                return BadRequest("Something went wrong");
            }
            return Ok();
        }
    }
}