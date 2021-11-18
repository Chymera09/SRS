using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<SubjectDto>> GetSubjectsAsync();
        Task<bool> SubjectExists(string code);
        void Add(Subject subject);
        void Update(Subject subject);
        Task<Subject> GetSubjectAsync(string code);
    }
}