namespace API.Entities
{
    public class AppUserCourse
    {
        public int Id { get; set; }
        public AppUser User { get; set; }
        public Course Course { get; set; }
    }
}