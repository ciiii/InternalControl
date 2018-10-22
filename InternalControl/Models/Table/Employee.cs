using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Employee[是否启用暂时没要类]
    /// </summary>
    [Serializable]
	public partial class Employee 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 工号
		/// </summary>
        [DisplayName("工号")]
        [Required(ErrorMessage ="请提供[WorkNumber]")]
        [MaxLength(50,ErrorMessage ="WorkNumber不能超过[25]字")]
		public string WorkNumber { get; set; }
        /// <summary>
		/// 密码
		/// </summary>
        [DisplayName("密码")]
        [MaxLength(50,ErrorMessage ="Password不能超过[25]字")]
		public string Password { get; set; }
        /// <summary>
		/// 姓名
		/// </summary>
        [DisplayName("姓名")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(50,ErrorMessage ="Name不能超过[25]字")]
		public string Name { get; set; }
        /// <summary>
		/// 部门编号
		/// </summary>
        [DisplayName("部门编号")]
		public int? DepartmentId { get; set; }
        /// <summary>
		/// 性别
		/// </summary>
        [DisplayName("性别")]
        [MaxLength(50,ErrorMessage ="Sex不能超过[25]字")]
		public string Sex { get; set; }
        /// <summary>
		/// 手机
		/// </summary>
        [DisplayName("手机")]
        [MaxLength(50,ErrorMessage ="Phone不能超过[25]字")]
		public string Phone { get; set; }
        /// <summary>
		/// 职务名称
		/// </summary>
        [DisplayName("职务名称")]
        [MaxLength(50,ErrorMessage ="DutyName不能超过[25]字")]
		public string DutyName { get; set; }
        /// <summary>
		/// 岗位名称
		/// </summary>
        [DisplayName("岗位名称")]
        [MaxLength(50,ErrorMessage ="PostName不能超过[25]字")]
		public string PostName { get; set; }
        /// <summary>
		/// 岗位类型
		/// </summary>
        [DisplayName("岗位类型")]
        [MaxLength(50,ErrorMessage ="PostType不能超过[25]字")]
		public string PostType { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(500,ErrorMessage ="Remark不能超过[250]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}