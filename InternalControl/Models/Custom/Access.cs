using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// 登录信息
    /// </summary>
    public class LoginInfo
    {
        /// <summary>
        /// 工号
        /// </summary>
        [Required(ErrorMessage = "工号不能为空")]
        public string WorkNumber { get; set; }

        /// <summary>
		/// 密码
		/// </summary>
        [Required(ErrorMessage = "密码不能为空")]
        public string Password { get; set; }

    }

    /// <summary>
    /// 
    /// </summary>
    public class ChangePassword
    {
        /// <summary>
        /// 当前登录人的旧密码
        /// </summary>
        public string OldPassword { get; set; }
        /// <summary>
        /// 当前登录人的新密码
        /// </summary>
        public string NewPassword { get; set; }
    }

    /// <summary>
    /// 当前登录人的信息
    /// </summary>
    public class CurrentUser
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string WorkNumber { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? DepartmentId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int RoleId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string RoleName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Sex { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string DutyName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string PostName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string PostType { get; set; }
    }
}