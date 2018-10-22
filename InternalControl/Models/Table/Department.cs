using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Department[部门   是否启用暂时没要;   merge时要将这个负责人加入到本部门对应的角色组去(如果有负责人)   角色编号必填;   类]
    /// </summary>
    [Serializable]
	public partial class Department 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 上级部门编号
		/// </summary>
        [DisplayName("上级部门编号")]
        [Required(ErrorMessage ="请提供[ParentId]")]
		public int ParentId { get; set; }
        /// <summary>
		/// 名称
		/// </summary>
        [DisplayName("名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 角色编号
		/// </summary>
        [DisplayName("角色编号")]
        [Required(ErrorMessage ="请提供[RoleId]")]
		public int RoleId { get; set; }
        /// <summary>
		/// 负责人编号
		/// </summary>
        [DisplayName("负责人编号")]
		public int? PrincipalId { get; set; }
        /// <summary>
		/// 排序值
		/// </summary>
        [DisplayName("排序值")]
        [Required(ErrorMessage ="请提供[Sort]")]
		public int Sort { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}