using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public AppUser Lecturer { get; set; }
        public string Location { get; set; }
        public int Limit { get; set; }
    }
}