using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SubjectController : BaseApiController
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly DataContext _context;
        public SubjectController(DataContext context, ISubjectRepository subjectRepository, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _subjectRepository = subjectRepository;
            _userRepository = userRepository;
            _context = context;
        }

        [HttpGet("subjects")]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
        {
            var subjects = await _subjectRepository.GetSubjectsAsync();

            return Ok(subjects);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddSubject(SubjectDto subjectDto)
        {
            if(await _subjectRepository.SubjectExists(subjectDto.Code))
            {
                return BadRequest("Subject already exists");
            }

            var user = await _userRepository.GetUserByUsernameAsync(subjectDto.Username);
            if(user == null)
            {
                return BadRequest("User cannot find");
            }

            var subject = new Subject
            {
                Name = subjectDto.Name,
                Code = subjectDto.Code,
                AppUser = user // await _userRepository.GetUserByUsernameAsync(username)
            };

            _subjectRepository.Add(subject);

            var result = await _context.SaveChangesAsync();
            if(result == 0)
            {
                return BadRequest("Something wen wrongggg");
            }
            return Ok();
        }


        [HttpPut]
        public async Task<ActionResult> UpdateSubject(SubjectDto subjectDto)
        {
            if(await _subjectRepository.SubjectExists(subjectDto.Code))
            {
                return BadRequest("Subject already exists");
            }

            var user = await _userRepository.GetUserByUsernameAsync(subjectDto.Username);

            var subject = new Subject
            {
                Id = subjectDto.Id,
                Code = subjectDto.Code,
                Name = subjectDto.Name,
                AppUser = user
            };             

            _subjectRepository.Update(subject);

            if (await _context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update subject");
        }

    }
}