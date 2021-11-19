using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Subject> Subjects { get; set; }
        public ICollection<AppUserCourse> UserCourses { get; set; }
    }
}