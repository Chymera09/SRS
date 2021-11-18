using API.Entities;

namespace API.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Limit { get; set; }
        public string Username { get; set; }
        public string Code { get; set; }
    }
}