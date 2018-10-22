using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Permission[类]
    /// </summary>
    [Serializable]
	public partial class Permission 
	{       
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[ParentId]")]
		public int ParentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 组件名称
		/// </summary>
        [DisplayName("组件名称")]
        [MaxLength(100,ErrorMessage ="ComponentName不能超过[50]字")]
		public string ComponentName { get; set; }
        /// <summary>
		/// 1 菜单 2 按钮
		/// </summary>
        [DisplayName("1 菜单 2 按钮")]
        [Required(ErrorMessage ="请提供[Type]")]
		public int Type { get; set; }
        /// <summary>
		/// 排序
		/// </summary>
        [DisplayName("排序")]
        [Required(ErrorMessage ="请提供[Sort]")]
		public int Sort { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(100,ErrorMessage ="Style不能超过[50]字")]
		public string Style { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}