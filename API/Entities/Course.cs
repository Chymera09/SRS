using System.Collections.Generic;

namespace API.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Limit { get; set; }
        public AppUser Lecturer { get; set; }
        public Subject Subject { get; set; }
        public ICollection<AppUserCourse> UserCourses { get; set; }
    }
}