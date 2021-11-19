using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
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

        [HttpGet("courses/{username}")]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses(string username)
        {
            //username = "bart22";
            var courses = await _courseRepository.GetCoursesAsync();

            var userCourses = await _courseRepository.GetTakenCoursesAsync(username);

            foreach(var userCourse in userCourses)
            {
                foreach(var course in courses)
                {
                    if(userCourse.CourseId == course.Id)
                    {
                        course.Taken = true;
                        break;
                    }
                }
            }

            return Ok(courses);
        }

        /*[HttpGet("{subjectcode}")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourse(string subjectcode)
        {           
            var courses =  await _courseRepository.GetCourseAsync(subjectcode);
            return Ok(courses);
        }*/

        [Authorize(Policy = "ModerateRole")]
        [HttpPost("add")]
        public async Task<ActionResult> AddCourse(CourseDto courseDto)
        {           
            var subject = await _subjectRepository.GetSubjectAsync(courseDto.Code);
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

            _courseRepository.AddAsync(course);

            var result = await _context.SaveChangesAsync();
            if(result == 0)
            {
                return BadRequest("Something went wrong");
            }
            return Ok();
        }

        [Authorize(Policy = "ModerateRole")]
        [HttpPut]
        public async Task<ActionResult> UpdateCourse(CourseDto courseDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(courseDto.Username);
            if(user == null)
            {
                return BadRequest("User not found!");
            }

            var subject = await _subjectRepository.GetSubjectAsync(courseDto.Code);
            if(subject == null)
            {
                return BadRequest("Subject not found!");
            }

            var course = new Course
            {
                Id = courseDto.Id,
                Type = courseDto.Type,
                StartTime = courseDto.StartTime,
                EndTime = courseDto.EndTime,
                Limit = courseDto.Limit,
                Lecturer = user,
                Subject = subject
            };             

            _courseRepository.Update(course);

            if (await _context.SaveChangesAsync() == 0) return NoContent();

            return Ok();
        }

        [HttpPost("takeCourse")]
        public async Task<ActionResult> TakeCourse(AppUserCourseDto userCourseDto)
        {           
           var user = await _userRepository.GetUserByUsernameAsync(userCourseDto.UserName);
            if(user == null)
            {
                return BadRequest("User not found!");
            }

            var course = await _courseRepository.GetCourseByIdAsync(userCourseDto.CourseId);
            if(course == null)
            {
                return BadRequest("Course not found!");
            }

            if(await _courseRepository.GetCourseStudentCountAsync(course.Id, user.UserName) == course.Limit)
            {
                return BadRequest("There is no free space!");
            }

            var appUserCourse = new AppUserCourse{User = user, Course = course};

            if(await _courseRepository.UserCourseExistsAsync(appUserCourse))
            {
                return BadRequest("Course already taken!");
            }

            _courseRepository.AddUserCourseAsync(appUserCourse);

            var result = await _context.SaveChangesAsync();
            if(result == 0)
            {
                return BadRequest("Something went wrong");
            }
            return Ok();

        }

        [HttpDelete()]
        public async Task<ActionResult> DropCourse(AppUserCourseDto userCourseDto)
        { 
            var user = await _userRepository.GetUserByUsernameAsync(userCourseDto.UserName);
            if(user == null)
            {
                return BadRequest("User not found!");
            }

            var course = await _courseRepository.GetCourseByIdAsync(userCourseDto.CourseId);
            if(course == null)
            {
                return BadRequest("Course not found!");
            }

            var appUserCourse = _courseRepository.GetUserCourseAsync(new AppUserCourse{Course = course, User = user});

            _courseRepository.RemoveUserCourseAsync(appUserCourse.Result);

            var result = await _context.SaveChangesAsync();
            if(result == 0)
            {
                return BadRequest("Something went wrong");
            }

            return Ok();
        }
    }
}