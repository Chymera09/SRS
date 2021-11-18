using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SubjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<SubjectDto>> GetSubjectsAsync()
        {
                return await _context.Subjects
                .Include(u => u.AppUser)
                .Select(x => new SubjectDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    UserName = x.AppUser.UserName
                })
                .ToListAsync();
        }

        public async Task<bool> SubjectExists(string code)
        {
            return await _context.Subjects.AnyAsync(x => x.Code.ToLower() == code.ToLower());
        }

        public void Add(Subject subject)
        {
            _context.Subjects.AddAsync(subject);
        }

        public void Update(Subject subject)
        {
            _context.Entry(subject).State = EntityState.Modified;
        }

        public async Task<Subject> GetSubjectAsync(string code)
        {
            return await _context.Subjects
                .Where(x => x.Code == code)               
                .FirstOrDefaultAsync();
        }
    }
}