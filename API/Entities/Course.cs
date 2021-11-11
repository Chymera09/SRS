using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public AppUser Lecturer { get; set; }
        public string Location { get; set; }
        public int Limit { get; set; }
        public Subject Subject { get; set; }

        //TODO betenni es mappolni DataContext ben
        // public ICollection<AppUser> Students { get; set; }
    }
}