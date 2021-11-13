using System;
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
    public class SubjectRepository : ISubjectRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SubjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<Subject>> GetSubjectsAsync()
        {
            return await _context.Subjects
                //TODO megcsinalni ezt a szart
                // .Include(x => x.AppUser)
                // .ProjectTo<SubjectDto>(_mapper.ConfigurationProvider)
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
    }
}