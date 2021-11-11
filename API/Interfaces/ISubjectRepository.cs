using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<Subject>> GetSubjectsAsync();
        Task<bool> SubjectExists(string code);
        void Add(Subject subject);
    }
}